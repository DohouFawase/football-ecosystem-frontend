"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";

// Imports de TOUS les composants
import { Container } from '@/components/ui/Container';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Grid } from '@/components/ui/Grid';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Progress } from '@/components/ui/Progress';
import { Table } from '@/components/ui/Table';
import { Tabs } from '@/components/ui/Tabs';
import { Accordion } from '@/components/ui/Accordion';
import { Select } from '@/components/ui/Select';
import { Skeleton } from '@/components/ui/Skeleton';
import { Switch } from '@/components/ui/Switch';
import { Alert } from '@/components/ui/Alert';
import { Tooltip } from '@/components/ui/Tooltip'; // Ajouté
import { Breadcrumb } from '@/components/ui/Breadcrum';

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulation d'un chargement au démarrage
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

 const emptyData: { info: string }[] = [];// Pour tester l'état vide du tableau

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Container size="xl" as="main" className="py-12 flex-grow space-y-12">
        
        {/* 1. BREADCRUMB & TOOLTIP TEST */}
        <section className="flex justify-between items-center">
          <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "UI Kit Lab" }]} />
          <Tooltip content="Besoin d'aide ?" position="left">
            <div className="bg-gray-200 p-2 rounded-full cursor-help">❓</div>
          </Tooltip>
        </section>

        {/* 2. ALERTE DE BIENVENUE */}
        <Alert 
          variant="success" 
          title="Système Prêt" 
          message="Tous les composants réutilisables ont été chargés avec succès." 
        />

        {/* 3. SECTION HERO (SKELETONS VS REAL) */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Maîtrise du Layout</h2>
            <p className="text-gray-500">Test de la réactivité et des états de chargement.</p>
          </div>

          <Grid cols={3} gap={6}>
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <Card key={i}>
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" width="50%" />
                  </div>
                  <Skeleton variant="rectangular" height={100} />
                </Card>
              ))
            ) : (
              <>
                <Card title="Utilisateurs" description="Activité en temps réel">
                  <div className="flex -space-x-2 mt-2">
<Avatar fallback="A" alt="Avatar A" size="sm" />
<Avatar fallback="B" alt="Avatar B" size="sm" />
<Avatar fallback="C" alt="Avatar C" size="sm" />
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs border-2 border-white">+5</div>
                  </div>
                  <Button variant="ghost" className="mt-4 w-full justify-start text-blue-600">Voir tout →</Button>
                </Card>

                <Card title="Performance" description="Score SEO">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black">98</span>
                    <span className="text-green-500 text-sm font-bold mb-1">▲ 2%</span>
                  </div>
                  <Progress value={98} color="bg-green-500" className="mt-4" />
                </Card>

                <Card title="Réglages Rapides">
                  <div className="space-y-4 pt-2">
                    <Switch checked={isToggled} onChange={setIsToggled} label="Notifications Push" />
                    <Select options={[{label: "Français", value: "fr"}, {label: "English", value: "en"}]} />
                  </div>
                </Card>
              </>
            )}
          </Grid>
        </section>

        {/* 4. TABLEAU & ÉTAT VIDE */}
        <section className="bg-white p-6 rounded-xl border">
          <h2 className="text-xl font-bold mb-6">Gestion des Données</h2>
          <Tabs 
            items={[
              {
                id: 'active',
                label: 'Données Réelles',
                content: (
                  <Table 
                    data={[{ id: 1, type: "Composant", status: "Terminé" }]}
                    columns={[
                      { header: "ID", key: "id" },
                      { header: "Type", key: "type" },
                      { header: "Statut", key: "status", render: (item) => <Badge label={item.status} status="success" /> }
                    ]}
                  />
                )
              },
              {
                id: 'empty',
                label: 'Test État Vide',
                content: (
                  <Table 
                    data={emptyData} 
                    columns={[{ header: "Info", key: "info" }]} 
                  />
                )
              }
            ]}
          />
        </section>

        {/* 5. ACCORDÉON DE DOCUMENTATION */}
        <section>
          <h2 className="text-xl font-bold mb-4">Documentation</h2>
          <Accordion 
            items={[
              { id: '1', title: "Comment ajouter une nouvelle icône ?", content: "Utilisez la bibliothèque Lucide-React et passez l'icône dans la prop 'leftIcon' du composant Button." },
              { id: '2', title: "Comment changer le thème ?", content: "Modifiez les variables de couleur dans le fichier tailwind.config.ts." }
            ]} 
          />
        </section>

        {/* BOUTON FLOTTANT POUR MODALE */}
        <div className="fixed bottom-8 right-8">
          <Tooltip content="Ajouter un élément" position="top">
            <Button onClick={() => setModalOpen(true)} className="rounded-full h-14 w-14 shadow-2xl text-2xl">
              +
            </Button>
          </Tooltip>
        </div>

        {/* MODALE FINALE */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setModalOpen(false)} 
          title="Nouveau Composant"
          footer={<Button onClick={() => setModalOpen(false)} isFullWidth>Enregistrer</Button>}
        >
          <div className="space-y-4">
            <Input label="Nom du composant" placeholder="ex: DatePicker" />
            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-700">
              Note : Assurez-vous de bien définir les types TypeScript avant de créer le composant.
            </div>
          </div>
        </Modal>

      </Container>

      {/* 6. FOOTER (MANQUANT) */}
      <footer className="border-t bg-white py-8">
        <Container size="xl">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <p>© 2026 - Partenaire de Code - UI Kit Lab</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-600">Documentation</a>
              <a href="#" className="hover:text-blue-600">GitHub</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}