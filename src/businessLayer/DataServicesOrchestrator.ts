import { ClientAirtableService } from '../services/ClientAirtableService';
import { CategoryAirtableService } from '../services/CategoryAirtableService';
import { EmailExampleAirtableService } from '../services/EmailExampleAirtableService';  
import type { ClientFullDataModel } from '../models/ClientFullDataModel';


export class DataServicesOrchestrator {
    private static instance: DataServicesOrchestrator;
    private readonly clientAirtableService: ClientAirtableService;
    private readonly categoryAirtableService: CategoryAirtableService;
    private readonly emailExampleAirtableService: EmailExampleAirtableService;
  
    private constructor() {
      this.clientAirtableService = ClientAirtableService.getInstance();
      this.categoryAirtableService = CategoryAirtableService.getInstance();
      this.emailExampleAirtableService = EmailExampleAirtableService.getInstance();
    }

    public async GetAllClientData(clientEmail: string) : Promise<ClientFullDataModel> {
      console.log("GetAllClientData 2");
      var clientData = await this.clientAirtableService.findRecordByEmail(clientEmail);
      const mappedClientData = this.clientAirtableService.mapAirtableFieldsToClientData(clientData?.fields!);

      const clientEmailCategories = await this.categoryAirtableService.getCategoriesByClientFullname(mappedClientData.firstName!+" "+mappedClientData.last);

      console.log("GetAllClientData 4");
      for(const category of clientEmailCategories){
        console.log("category.id! :"+category.id!);
        const emailexamples = await this.emailExampleAirtableService.getEmailExamplesByCategory(category.id!)
        category.examples = emailexamples;
      }
      console.log("GetAllClientData 5");
      const userFullData: ClientFullDataModel = {
        clientData: mappedClientData,
        categorySection: clientEmailCategories
      }

      console.log("return userFullData");
      return userFullData;
    }

    public static getInstance(): DataServicesOrchestrator {
    if (!DataServicesOrchestrator.instance) {
      DataServicesOrchestrator.instance = new DataServicesOrchestrator();
    }
    return DataServicesOrchestrator.instance;
  }
}



