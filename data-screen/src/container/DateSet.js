import { setDate } from "../actions";
import { connect } from 'react-redux';
import customDatePicker from '@components/customDatePicker';

const mapStateToProps = (state, ownProps) => ({
    value: state.date
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        console.log('redux')
        dispatch(setDate(ownProps.value));
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(customDatePicker)
