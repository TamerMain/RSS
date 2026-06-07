import { useSelector } from 'react-redux';
import { type RootState } from '@/store/store';
import EntryCard from './EntryCard';

function EntriesList() {
  const entriesList = useSelector((state: RootState) => state.entries);
  const entriesLength = entriesList.length;
  return (
    <div className="grid grid-cols-3 gap-2 m-5">
      {!entriesList && <div></div>}
      {entriesList &&
        entriesList.map((entryData, index) => (
          <EntryCard
            key={index}
            data={entryData}
            lastEntry={entriesLength === index + 1}
          />
        ))}
    </div>
  );
}

export default EntriesList;
