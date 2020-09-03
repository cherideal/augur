import React, { ReactNode, useEffect, useState } from 'react';
import { Market } from 'modules/portfolio/types';
import EmptyDisplay from 'modules/portfolio/components/common/empty-display';
import Styles from 'modules/portfolio/components/common/quad-box.styles.less';
import QuadBox, { QuadBoxProps } from 'modules/portfolio/components/common/quad-box';

export interface FilterSwitchBoxProps extends QuadBoxProps {
  data: Market[];
  filterComp: Function;
  filterLabel: string;
  renderRows: Function;
  switchView?: Function;
  emptyDisplayConfig?: {
    emptyTitle?: string;
    emptyText?: string;
    icon?: ReactNode;
    button?: ReactNode;
  }
}

const FilterSwitchBox = ({
  title,
  headerComplement,
  subheader,
  footer,
  customClass,
  sortByOptions,
  data,
  filterComp,
  filterLabel,
  renderRows,
  switchView,
  emptyDisplayConfig,
  toggle,
  hide,
  extend,
}: FilterSwitchBoxProps) => {
  const [search, setSearch] = useState('');
  const [view, setView] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const thereIsData = filteredData.length > 0;

  useEffect(() => {
    let filteredData = data;
    if (search !== '') {
      filteredData = applySearch(search, data);
    }
    setFilteredData(filteredData);
  }, [data]);

  const onSearchChange = (input: string) => {
    setSearch(input);
    const filteredData = applySearch(input, data);
    setFilteredData(filteredData);
  };

  const applySearch = (input: string, filteredData: Market[]) => {
    return filteredData.filter(filterComp.bind(applySearch, input));
  };

  const updateView = () => {
    if (switchView) {
      switchView();
    }
    setView(!view);
  };

  return (
    <QuadBox
      title={title}
      headerComplement={
        <>
          {thereIsData && (
            <div className={Styles.Count}>{filteredData.length}</div>
          )}
          {headerComplement}
        </>
      }
      search={search}
      customClass={customClass}
      setSearch={onSearchChange}
      sortByOptions={sortByOptions}
      updateDropdown={updateView}
      subheader={subheader}
      footer={footer}
      toggle={toggle}
      hide={hide}
      extend={extend}
      content={
        <>
          {thereIsData ? (
            filteredData.map(data => renderRows(data))
          ) : (
            <EmptyDisplay
              selectedTab=""
              filterLabel={filterLabel}
              search={search}
              title={title}
              {...emptyDisplayConfig}
            />
          )}
        </>
      }
    />
  );
};

export default FilterSwitchBox;
