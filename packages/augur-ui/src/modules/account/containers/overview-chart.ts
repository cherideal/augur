import { connect } from 'react-redux';
import { AppState } from 'appStore';
import OverviewChart from 'modules/account/components/overview-chart';
import getProfitLoss from 'modules/positions/actions/get-profit-loss';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { AppStatusState } from 'modules/app/store/app-status';

const mapStateToProps = (state: AppState) => {
  const { blockchain: { currentAugurTimestamp }} = AppStatusState.get();
  return {
    universe: state.universe.id,
    currentAugurTimestamp
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<void, any, Action>) => ({
  getProfitLoss: (universe: string, startTime: number, endTime: number) =>
    dispatch(getProfitLoss({ universe, startTime, endTime })),
});

const OverviewChartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewChart);

export default OverviewChartContainer;
