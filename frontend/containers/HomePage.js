// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home/Home';
import * as UseCasesActions from '../actions/UseCases';

function mapStateToProps(state) {
  return {
    use_cases: state.UseCasesReducer.use_cases,
    isLoadingUseCases: state.UseCasesReducer.isLoadingUseCases
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UseCasesActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
