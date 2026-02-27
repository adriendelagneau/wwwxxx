import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description:
    "Conditions générales d'utilisation du site BZ1 - Boissons Originales.",
};

export default function TermsPage() {
  return (
    <div className="bg-primary text-secondary font-poppins min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl md:text-5xl">
          Conditions Générales d'Utilisation
        </h1>

        <div className="space-y-6 text-lg">
          <section>
            <h2 className="mb-4 text-2xl">1. Acceptance des conditions</h2>
            <p>
              En accédant et en utilisant ce site web, vous acceptez d'être lié
              par les présentes conditions générales d'utilisation. Si vous
              n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl">2. Propriété intellectuelle</h2>
            <p>
              Le contenu de ce site, y compris mais sans s'y limiter, les
              textes, graphiques, logos, images et logiciels, est la propriété
              de BZ1 et protégé par les lois sur la propriété intellectuelle.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl">3. Utilisation du site</h2>
            <p>
              Vous acceptez d'utiliser ce site uniquement à des fins légales et
              de manière à ne pas porter atteinte aux droits de tiers ou limiter
              l'utilisation de ce site par d'autres personnes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl">4. Limitation de responsabilité</h2>
            <p>
              BZ1 s'efforce de fournir des informations exactes sur ce site,
              mais ne peut garantir l'exactitude, l'exhaustivité ou l'actualité
              des informations. L'utilisation des informations est à vos propres
              risques.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl">5. Modifications</h2>
            <p>
              BZ1 se réserve le droit de modifier ces conditions générales à
              tout moment. Les modifications entrent en vigueur dès leur
              publication sur ce site.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl">6. Contact</h2>
            <p>
              Pour toute question concernant ces conditions, veuillez nous
              contacter à l'adresse email@bz1.fr
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
