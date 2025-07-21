import type { DataTableModel } from '../models/DataTableModel/DataTableModel.ts';

export type Client = {
  name: string;
  age: number;
  email: string;
  phone: string;
  city: string;
  createdAt: string;
  status: 'Actif' | 'Inactif' | 'Prospect';
};

const FakeClientsDataTableModel: DataTableModel<Client> = {
  data: [
    {
      name: 'Jean Dupont',
      age: 30,
      email: 'jean.dupont@mail.com',
      phone: '0475 123 456',
      city: 'Bruxelles',
      createdAt: '2023-05-10',
      status: 'Actif',
    },
    {
      name: 'Lucie Martin',
      age: 25,
      email: 'lucie.martin@mail.com',
      phone: '0479 789 321',
      city: 'Liège',
      createdAt: '2023-01-15',
      status: 'Prospect',
    },
    {
      name: 'Mohamed El Amrani',
      age: 34,
      email: 'mohamed.elamrani@mail.com',
      phone: '0486 111 222',
      city: 'Namur',
      createdAt: '2022-11-01',
      status: 'Actif',
    },
    {
      name: 'Sophie Dubois',
      age: 29,
      email: 'sophie.dubois@mail.com',
      phone: '0472 555 666',
      city: 'Charleroi',
      createdAt: '2024-03-22',
      status: 'Inactif',
    },
    {
      name: 'Julien Lemoine',
      age: 42,
      email: 'julien.lemoine@mail.com',
      phone: '0471 333 444',
      city: 'Mons',
      createdAt: '2023-12-05',
      status: 'Actif',
    },
    {
      name: 'Claire Fontaine',
      age: 36,
      email: 'claire.fontaine@mail.com',
      phone: '0488 777 888',
      city: 'Namur',
      createdAt: '2022-07-18',
      status: 'Prospect',
    },
  ],
  columns: [
    { key: 'name', label: 'Nom' },
    { key: 'age', label: 'Âge' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Téléphone' },
    { key: 'city', label: 'Ville' },
    { key: 'createdAt', label: 'Date d’inscription' },
    { key: 'status', label: 'Statut' },
  ],
};

export default FakeClientsDataTableModel;
