import { Card, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';

const Table = ({ data, config }) => {
  const renderedHeader = config.map((e) => (
    <th
      key={e.label}
      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
    >
      <Typography
        variant="small"
        color="blue-gray"
        className="font-normal leading-none opacity-70"
      >
        {e.label}
      </Typography>
    </th>
  ));

  const renderedRows = data.map((rowData) => {
    const renderedCell = config.map((column, index) => {
      return (
        <td className="p-4" key={`${column.label}${index}`}>
          {column.render(rowData)}
        </td>
      );
    });
    return (
      <tr className="even:bg-blue-gray-50/50" key={rowData.id}>
        {renderedCell}
      </tr>
    );
  });

  return (
    <div className="w-full overflow-visible">
      <Card className="min-w-max">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>{renderedHeader}</tr>
          </thead>
          <tbody>{renderedRows}</tbody>
        </table>
      </Card>
    </div>
  );
};
Table.propTypes = {
  config: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default Table;
