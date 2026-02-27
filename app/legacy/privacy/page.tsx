import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description:
    "Politique de confidentialité de BZ1 - Vos données personnelles et notre engagement.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-primary text-secondary font-poppins min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl md:text-5xl">
          Politique de Confidentialité
        </h1>

        <div className="space-y-6 text-lg">
          <section>
            <h2 className="mb-4 text-2xl">1. Introduction</h2>
            <p>
              La présente politique de confidentialité décrit comment BZ1
              collecte, utilise et protège vos données personnelles conformément
              au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl">2. Données collectées</h2>
            <p>
              Nous collectons les données nécessaires au fonctionnement de notre
              service, notamment : nom, email, adresse et historique de
              commandes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl">3. Utilisation des données</h2>
            <p>
              Vos données sont utilisées pour : traiter vos commandes, améliorer
              nos services, vous contacter concernant votre compte et respecter
              nos obligations légales.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl">4. Protection des données</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité appropriées pour
              protéger vos données contre tout accès non autorisé, modification,
              divulgation ou destruction.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl">5. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité,
              veuillez nous contacter à l'adresse email@bz1.fr
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
