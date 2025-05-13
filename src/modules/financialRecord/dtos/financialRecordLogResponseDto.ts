
import { FinancialRecordLogWithUserName } from '../domain/financialRecordTypes';

interface UpdatedValue {
  key: string;
  origin: any;
  current: any;
}

interface ReferenceMaps {
  applicationFormMap: Record<string, string>;
  counterpartyMap: Record<string, string>;
  mainAccountMap: Record<string, string>;
  subAccountMap: Record<string, string>;
  subsidiaryMap: Record<string, string>;
}

interface SingleLogResponse {
  userName: string;
  updatedValues: UpdatedValue[];
  changeReason: string;
  createdAt: Date;
}

export class FinancialRecordLogResponseDto {
  static buildResponse(
    logs: FinancialRecordLogWithUserName[],
    references: ReferenceMaps
  ): { data: SingleLogResponse[] } {
    const data = logs.map((log) => {
      const updatedValues: UpdatedValue[] = [];

      const oldValues = log.old_values || {};
      const newValues = log.new_values || {};

      for (const key of Object.keys(oldValues)) {
        const oldVal = oldValues[key];
        const newVal = newValues[key];

        if (oldVal === newVal) continue;

        const mapValue = (
          map: Record<string, string>,
          label: string
        ): UpdatedValue => {
          return {
            key: label,
            origin: map?.[oldVal as string] ?? oldVal,
            current: map?.[newVal as string] ?? newVal,
          };
        };

        switch (key) {
          case 'subsidiaryId':
            updatedValues.push(
              mapValue(references.subsidiaryMap, 'subsidiaryName')
            );
            break;
          case 'counterpartyId':
            updatedValues.push(
              mapValue(references.counterpartyMap, 'counterpartyName')
            );
            break;
          case 'subAccountId':
            updatedValues.push(
              mapValue(references.subAccountMap, 'subAccountName')
            );
            break;
          case 'mainAccountId':
            updatedValues.push(
              mapValue(references.mainAccountMap, 'mainAccountName')
            );
            break;
          case 'applicationFormId':
            updatedValues.push(
              mapValue(references.applicationFormMap, 'applicationFormName')
            );
            break;
          default:
            updatedValues.push({
              key,
              origin: oldVal,
              current: newVal,
            });
        }
      }

      return {
        userName: log.user_name || log.user_id,
        updatedValues,
        changeReason: log.change_reason,
        createdAt: log.created_at,
      };
    });

    return { data };
  }
}