export async function createEbook(data: any) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                category: 'ebooks',
                product_category_id: 2,
                short_description: data.shortDescription,
                description: data.description,
                current_problems: data.currentProblems.map((problem: any) => {
                    if (typeof problem === 'object' && problem !== null) {
                        return problem.problem;
                    }
                    return problem;
                }),
                is_active: true
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating ebook:', error);
        throw error;
    }
} 