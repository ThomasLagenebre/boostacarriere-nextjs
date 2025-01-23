import React from 'react'
import LegalParagraph from './_components/LegalParagraph'

export default function page() {
  return (
    <div className="max-w-screen-xl mx-auto mb-20 dark:text-white text-justify">
      <h2 className="text-center text-3xl font-bold mb-10 text-secondary">Mentions légales</h2>
      <p className="italic">
        Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour
        la confiance en l&apos;économie numérique, il est précisé aux utilisateurs du
        site Boostacarriere l&apos;identité des différents intervenants dans le cadre
        de sa réalisation et de son suivi.
      </p>
      <LegalParagraph title={"Éditeur du site"}>
        Le site internet Boostacarriere est édité par : <br />
        <span className="font-bold">Boostacarriere</span>
        <br />
        Entreprise individuelle <br />
        SIRET : 931 740 906 00017 <br />
        Siège social : 262 rue Gabriel Péri, 94230 Cachan <br />
        Directrice de la publication : Laurine Lagenebre <br />
        Contact :{" "}
        <a className="underline" href="mailto:contact.boostacarriere@gmail.com">
          contact.boostacarriere@gmail.com
        </a>
        <br />
      </LegalParagraph>
      <LegalParagraph title={"Hébergement du site"}>
        Le site est hébergé par : <br />
        <span className="font-bold">HOSTINGER INTERNATIONAL LTD</span> <br />
        61 Lordou Vironos Street, 6023 Larnaca, Chypre <br />
        Pour les contacter :{" "}
        <a
          className="underline"
          target="_blank"
          rel="noreferrer"
          href="https://www.hostinger.fr/contact"
        >
          https://www.hostinger.fr/contact
        </a>
        <br />
      </LegalParagraph>
      <LegalParagraph title={"Politique de confidentialité et cookies"}>
        <p>
          En France, les données personnelles sont notamment protégées par la
          loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004,
          l’article L. 226-13 du Code pénal et la Directive Européenne du 24
          octobre 1995.{" "}
        </p>
        <p className="my-2">
          A l’occasion de l’utilisation du site , peuvent être recueillies :
          l’URL des liens visités sur ce site, le fournisseur d’accès de
          l’utilisateur, l’adresse de protocole Internet (IP) de l’utilisateur,
          le fuseau horaire de l&apos;utilisateur.{" "}
        </p>

        <p className="my-2">
          Toutes les informations recueillies peuvent être utilisées pour :
          Personnaliser votre expérience et répondre à vos besoins individuels ,
          fournir un contenu publicitaire personnalisé, améliorer notre site,
          améliorer le service client et vos besoins de prise en charge et
          établir des informations statistiques concernant l&apos;utilisation du site
          web.
        </p>
        <ol className="list-decimal ps-10">
          <li>
            <h4 className="text-lg font-bold text-secondary dark:text-primary">
              Informations collectées
            </h4>
            <p>
              Lorque l&apos;utilisateur remplis des formulaires, il fournis
              volontairement certaines informations énumérées ci-dessous :{" "}
            </p>
            <ul className="list-disc ps-6">
              <li>Adresse email</li>
              <li>Nom complet</li>
            </ul>
            Sur chacun des formulaires présents, l&apos;utilisateur consent
            explicitement l&apos;utilisation de ses données personnelles conformément
            aux présentes mentions légales.
          </li>
          <li>
            <h4 className="text-lg font-bold text-secondary dark:text-primary">
              Utilisation des données
            </h4>
            <p>
              Boostacarriere est responsable du traitement de ces données. Les
              informations ci-listées précédemment sont utilisées afin de :{" "}
            </p>
            <ul className="list-disc ps-6">
              <li>Partager l&apos;actualité de Boostacarriere</li>
              <li>Personnaliser les échanges avec Boostacarriere</li>
              <li>Vous permettre d&apos;accèder aux services demandées</li>
            </ul>
            Les informations personnelles collectées par Boostacarriere ne
            seront utilisées que dans le cadre de leurs missions, elles ne
            pourront être utilisées à des fins commerciales par Boostacarriere
            et ses partenaires. Elles ne sont ni vendues, ni échangées, ni
            transférées à des tiers, hors entreprises de confiance qui oeuvrent
            avec Boostacarriere à l&apos;exploitation du site et du bon déroulement
            des activités.
          </li>
          <li>
            <h4 className="text-lg font-bold text-secondary dark:text-primary">
              Protection des données personnelles
            </h4>
            <p>
              Les informations recueillies via le formulaire de contact ou de
              commande sont destinées à la gestion de la relation commerciale.
              Conformément à la loi « Informatique et Libertés », vous disposez
              d’un droit d’accès, de rectification, de suppression et
              d’opposition sur vos données personnelles. Pour exercer ce droit,
              vous pouvez me contacter à contact.boostacarriere@gmail.com
            </p>
          </li>
        </ol>
      </LegalParagraph>
      <LegalParagraph title={"Propriété intellectuelle"}>
        Tous les éléments du site (textes, images, logos, etc.) sont protégés
        par les droits d’auteur. Toute reproduction, modification, distribution
        ou exploitation de ces éléments sans autorisation préalable est
        strictement interdite.
      </LegalParagraph>
    </div>
  )
}
