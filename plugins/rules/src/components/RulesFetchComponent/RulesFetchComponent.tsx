import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableColumn,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import { useEntity } from '@backstage/plugin-catalog-react';
import { NotImplementedError } from '@backstage/errors';
import { ScoreCard } from '../../api/types';
import { ScoreCardBackendClient } from '../../api/RulesClient';
import { useScoreCards } from '../../useRulesClient';

export const exampleScorecards = {
  results: [
    {
      status: 'Ok',
      measureName: 'Code coverage',
      measureValue: '50',
    },
    {
      status: 'Warning',
      measureName: 'Security Issues',
      measureValue: '90',
    },
  ],
};

const useStyles = makeStyles({
  avatar: {
    height: 32,
    width: 32,
    borderRadius: '50%',
  },
});

type DenseTableProps = {
  scorecards: ScoreCard[];
};

export const DenseTable = ({ scorecards }: DenseTableProps) => {
  const classes = useStyles();

  const columns: TableColumn[] = [
    { title: 'Status', field: 'status' },
    { title: 'Measure', field: 'measureName' },
    { title: 'Value', field: 'measureValue' },
  ];

  const data = scorecards.map(scorecard => {
    return {
      status: scorecard.status,
      measureValue: scorecard.measureValue,
      measureName: scorecard.measureName,
    };
  });

  const { entity } = useEntity();

  const fullTitle = `Scorecard for ${  entity.metadata.name}`;

  return (
    <Table
      title={fullTitle}
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const RulesFetchComponent = () => {
  const { value, loading, error } = useScoreCards();

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <div> error</div>;
  }

  return <DenseTable scorecards={value || []} />;
};
