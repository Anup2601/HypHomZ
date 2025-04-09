"use client";
import React from "react";
import StatusBar from "./signin/StatusBar";
import { Header } from "./Header";
import { RoleCard } from "./RoleCard";
import { SkipLink } from "./SkipLink";
import { SpecialistCard } from "./SpecialistCard";
import { ProviderCard } from "./ProviderCard";

export const RoleSelectionScreen: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-amber-400 font-['Roboto']">
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      {/* <StatusBar /> */}
      <section className="px-4 py-11 max-sm:px-4 max-sm:py-6">
        <Header title="Select a Role" />
        <div className="flex flex-col gap-4">
          <RoleCard
            title="Looking for a specialist"
            description="To place any type of order to search for a performer"
            illustration={<SpecialistCard />}
          />
          <RoleCard
            title="Service Provider"
            description="Search and execute orders in your field of activity"
            illustration={<ProviderCard />}
          />
        </div>
        <SkipLink />
      </section>
    </main>
  );
};

export default RoleSelectionScreen;
