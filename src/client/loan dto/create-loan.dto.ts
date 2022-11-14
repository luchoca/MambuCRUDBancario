import { DisbursmentDto } from "./disbursementDto.dto";
import { InformacionAdicional } from "./informacionAdicional.dto";
import { InterestSettings } from "./interestSettings.dt";
import { ScheduleSettings } from "./scheduleSettings.dto";

export class CreateLoanDto {
  accountHolderKey: string;
  accountHolderType: string;
  loanAmount: number;
  productTypeKey: string;
  interestSettings: InterestSettings;
  scheduleSettings: ScheduleSettings;
  disbursementDetails: DisbursmentDto;
  _Informacion_Adicional: InformacionAdicional;
}



