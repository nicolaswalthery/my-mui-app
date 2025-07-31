import type { ClientData } from './ClientData';
import type { CategorySection } from './CategoryData';

export interface ClientFullDataModel {
    clientData: ClientData;
    categorySection: CategorySection[];
}