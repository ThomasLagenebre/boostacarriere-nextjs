"use client";
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Skeleton from '@/app/_global_components/Skeleton';
import DeleteModal from '@/app/_global_components/DeleteModal';
import { fetchAllUsers, deleteUser, toggleUserStatus, updateUserRole } from '@/app/_data/fetchUsers';

// Import the User interface from fetchUsers.ts
type User = Awaited<ReturnType<typeof fetchAllUsers>>['data'][0];

interface Role {
  id: number;
  name: string;
}



// Composant Modal pour modifier le rôle
const RoleModal = ({ isOpen, onClose, onUpdate, user, roles }: {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (roleId: number) => void;
  user: User | null;
  roles: Role[];
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<number>(user?.role.id || 0);

  const handleUpdate = () => {
    if (selectedRoleId) {
      onUpdate(selectedRoleId);
      onClose();
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md">
        <h3 className="text-lg font-semibold mb-4">Modifier le rôle de {user.firstname} {user.lastname}</h3>
        <select
          value={selectedRoleId}
          onChange={(e) => setSelectedRoleId(Number(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Mettre à jour
          </button>
        </div>
      </div>
    </div>
  );
};

function ArrayAllUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [roles] = useState<Role[]>([
        { id: 1, name: 'Admin' },
        { id: 2, name: 'User' },
        { id: 3, name: 'Moderator' }
    ]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                const response = await fetchAllUsers();
                console.log('Users loaded:', response.data);
                setUsers(response.data);
            } catch (err) {
                console.error(err);
                toast.error('Erreur lors du chargement des utilisateurs');
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleDeleteClick = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedUser) return;

        try {
            await deleteUser(selectedUser.id);
            setUsers(users.filter(user => user.id !== selectedUser.id));
            setIsDeleteModalOpen(false);
            setSelectedUser(null);
            toast.success('L\'utilisateur a été supprimé avec succès');
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Une erreur est survenue lors de la suppression');
        }
    };

        const handleToggleStatus = async (user: User) => {
        const originalStatus = user.is_active ?? 1;
        
        try {
            const currentStatus = (user.is_active ?? 1) === 1;
            const newStatus = !currentStatus;
            
            console.log('Toggling user status:', user.id, 'current:', currentStatus, 'new:', newStatus, 'original:', originalStatus);
            
            // Mise à jour optimiste de l'interface
            setUsers(prevUsers => 
                prevUsers.map(u => u.id === user.id ? { ...u, is_active: newStatus ? 1 : 0 } : u)
            );
            
            const updatedUser = await toggleUserStatus(user.id, newStatus);
            console.log('Updated user from API:', updatedUser);
            
            // Mise à jour avec la réponse de l'API
            setUsers(prevUsers => 
                prevUsers.map(u => u.id === user.id ? { ...u, is_active: updatedUser.is_active } : u)
            );
            
            toast.success(`Utilisateur ${updatedUser.is_active === 1 ? 'activé' : 'désactivé'} avec succès`);
        } catch (error) {
            console.error('Error toggling user status:', error);
            
            // Revenir à l'état précédent en cas d'erreur
            setUsers(prevUsers => 
                prevUsers.map(u => u.id === user.id ? { ...u, is_active: originalStatus } : u)
            );
            toast.error('Une erreur est survenue lors de la modification du statut');
        }
    };

    const handleUpdateRole = async (roleId: number) => {
        if (!selectedUser) return;

        try {
            const updatedUser = await updateUserRole(selectedUser.id, roleId);
            setUsers(users.map(u => u.id === selectedUser.id ? { ...u, role: updatedUser.role } : u));
            setIsRoleModalOpen(false);
            setSelectedUser(null);
            toast.success('Rôle mis à jour avec succès');
        } catch (error) {
            console.error('Error updating user role:', error);
            toast.error('Une erreur est survenue lors de la modification du rôle');
        }
    };



    const handleRoleClick = (user: User) => {
        setSelectedUser(user);
        setIsRoleModalOpen(true);
    };

    if (loading) {
        return (
            <tbody>
                <tr>
                    <td colSpan={6}>
                        <Skeleton rows={1} columns={1} />
                    </td>
                </tr>
            </tbody>
        );
    }


    return (
        <tbody>
            {users.map((user) => (
                <tr className={`border-b ${(user.is_active ?? 1) === 1 ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700 opacity-60'}`} key={user.id}>
                    <th scope="row" className={`px-6 py-4 font-medium whitespace-nowrap ${(user.is_active ?? 1) === 1 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                        {user.id}
                    </th>
                    <td className={`px-6 py-4 ${(user.is_active ?? 1) === 1 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                        {user.firstname} {user.lastname}
                        {(user.is_active ?? 1) === 0 && <span className="ml-2 text-xs text-red-500">(Désactivé)</span>}
                    </td>
                    <td className={`px-6 py-4 ${(user.is_active ?? 1) === 1 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                        {user.email}
                    </td>
                    <td className="px-6 py-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            (user.is_active ?? 1) === 1 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-500'
                        }`}>
                            {user.role.name}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={(user.is_active ?? 1) === 1}
                                onChange={() => handleToggleStatus(user)}
                                className="sr-only peer"
                            />
                            <div className={`w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                                (user.is_active ?? 1) === 1 
                                    ? 'bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600' 
                                    : 'bg-gray-200 dark:bg-gray-700'
                            }`}></div>
                                                    <span className={`ml-3 text-sm font-medium ${
                            (user.is_active ?? 1) === 1 
                                ? 'text-gray-900 dark:text-gray-300' 
                                : 'text-gray-500 dark:text-gray-400'
                        }`}>
                            {(user.is_active ?? 1) === 1 ? 'Actif' : 'Désactivé'} [{user.is_active}]
                        </span>
                        </label>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                        <button 
                            className={`cursor-pointer ${(user.is_active ?? 1) === 0 ? 'opacity-50' : ''}`}
                            onClick={() => handleRoleClick(user)}
                            title="Modifier le rôle"
                            disabled={(user.is_active ?? 1) === 0}
                        >
                            <IoMdSettings size={20} className={`${(user.is_active ?? 1) === 1 ? 'text-orange-500' : 'text-gray-400'}`}/>
                        </button>
                        <button 
                            className='cursor-pointer'
                            onClick={() => handleDeleteClick(user)}
                            title="Supprimer"
                        >
                            <MdDeleteOutline size={22} className='text-red-400'/>
                        </button>
                    </td>
                </tr>
            ))}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedUser(null);
                }}
                onConfirm={handleConfirmDelete}
                title={`${selectedUser?.firstname} ${selectedUser?.lastname}`}
            />

            <RoleModal
                isOpen={isRoleModalOpen}
                onClose={() => {
                    setIsRoleModalOpen(false);
                    setSelectedUser(null);
                }}
                onUpdate={handleUpdateRole}
                user={selectedUser}
                roles={roles}
            />
        </tbody>
    );
}

export default ArrayAllUsers; 