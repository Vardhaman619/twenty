import { SettingsServerlessFunctionsFieldItemTableRow } from '@/settings/serverless-functions/components/SettingsServerlessFunctionsFieldItemTableRow';
import { SettingsServerlessFunctionsTableEmpty } from '@/settings/serverless-functions/components/SettingsServerlessFunctionsTableEmpty';
import { useGetManyServerlessFunctions } from '@/settings/serverless-functions/hooks/useGetManyServerlessFunctions';
import { SettingsServerlessFunctionHotkeyScope } from '@/settings/serverless-functions/types/SettingsServerlessFunctionHotKeyScope';
import { getSettingsPagePath } from '@/settings/utils/getSettingsPagePath';
import { SettingsPath } from '@/types/SettingsPath';
import { Table } from '@/ui/layout/table/components/Table';
import { TableBody } from '@/ui/layout/table/components/TableBody';
import { TableHeader } from '@/ui/layout/table/components/TableHeader';
import { TableRow } from '@/ui/layout/table/components/TableRow';
import styled from '@emotion/styled';
import { ServerlessFunction } from '~/generated-metadata/graphql';
import { useHotkeyScopeOnMount } from '~/hooks/useHotkeyScopeOnMount';

const StyledTableRow = styled(TableRow)`
  grid-template-columns: 312px 132px 68px;
`;

const StyledTableBody = styled(TableBody)`
  border-bottom: 1px solid ${({ theme }) => theme.border.color.light};
`;

export const SettingsServerlessFunctionsTable = () => {
  const { serverlessFunctions } = useGetManyServerlessFunctions();

  useHotkeyScopeOnMount(
    SettingsServerlessFunctionHotkeyScope.ServerlessFunction,
  );

  return (
    <>
      {serverlessFunctions.length ? (
        <Table>
          <StyledTableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Runtime</TableHeader>
            <TableHeader></TableHeader>
          </StyledTableRow>
          <StyledTableBody>
            {serverlessFunctions.map(
              (serverlessFunction: ServerlessFunction) => (
                <SettingsServerlessFunctionsFieldItemTableRow
                  key={serverlessFunction.id}
                  serverlessFunction={serverlessFunction}
                  to={getSettingsPagePath(SettingsPath.ServerlessFunctions, {
                    id: serverlessFunction.id,
                  })}
                />
              ),
            )}
          </StyledTableBody>
        </Table>
      ) : (
        <SettingsServerlessFunctionsTableEmpty />
      )}
    </>
  );
};
