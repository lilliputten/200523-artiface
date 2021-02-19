/** @module DateTimeSelector
 *  @class DateTimeSelector
 *  @since 2021.01.23, 19:44
 *  @changed 2021.01.26, 20:28
 *
 *  TODO 2020.12.16, 23:07 -- Add hidden html form element (for form submission)
 */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
// import connect from 'react-redux/es/connect/connect'
import { cn } from 'utils/configure';

import config from 'config';

// import FormItemHOC from '../FormItemHOC';

// import ModalPopup from 'elements/ModalPopup';
// import FormButton from 'forms/FormButton';
import * as langUtils from 'utils/lang';
// // getCommonLangText('cancelButton', 'Cancel', lang)}

import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/esm/locale';
import { registerLocale } from 'react-datepicker';

import * as dateUtils from 'utils/dates';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
// import { faCalendar } from '@fortawesome/free-regular-svg-icons';

import 'react-datepicker/dist/react-datepicker.css';

import './DateTimeSelector.pcss';

const cnDateTimeSelector = cn('DateTimeSelector');

const defaultDateType = 'number';

// Initialize locale
registerLocale('ru-RU', ru);
// TDDO: Register locales in target project (using config data)?

class DateTimeSelector extends React.PureComponent /** @lends @DateTimeSelector.prototype */ {

  static propTypes = {
    calendarClassName: PropTypes.string,
    disabled: PropTypes.bool,
    endDate: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date) ]),
    id: PropTypes.string,
    inputId: PropTypes.string,
    onChange: PropTypes.func,
    selectsEnd: PropTypes.bool,
    selectsRange: PropTypes.bool,
    selectsStart: PropTypes.bool,
    showTime: PropTypes.bool,
    startDate: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date) ]),
    timeIntervals: PropTypes.number,
    title: PropTypes.string,
    value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date) ]),
  }

  static defaultProps = {
    timeIntervals: 60,
  };

  // Lifecycle methods...

  constructor(props) {
    super(props);
    const {
      value,
      startDate,
      endDate,
      selectsRange,
    } = props;
    this.id = props.id || props.inputId || props.name;
    const dateType = props.dateType || dateUtils.detectDateValueType(value || startDate || endDate) || defaultDateType;
    this.state = {
      dateType,
      value: value && dateUtils.convertToDateObject(value),
      startDate: startDate && dateUtils.convertToDateObject(startDate),
      endDate: endDate && dateUtils.convertToDateObject(endDate),
      selectsStart: selectsRange,
    };
  }

  // Helper methods...

  getClassName() {
    const { id } = this;
    const classList = cnDateTimeSelector({
      id,
    }, [this.props.className]);
    return classList;
  }

  // Handlers...

  onChange = (value) => {
    // const origValue = value;
    const {
      selectsRange,
      onChange,
      showTime,
      timeIntervals,
    } = this.props;
    const {
      dateType,
    } = this.state;
    let setParams;
    let selectedStart = this.state.selectsStart;
    if (selectsRange) {
      let startDate = this.state.startDate;
      let endDate = this.state.endDate;
      if (Array.isArray(value)) { // datepicker v.3: array -- changed day, single value -- changed time
        value = value[0]; // ???
      }
      else {
        selectedStart = !selectedStart; // Re-revert start/end switch
      }
      if (selectedStart) {
        startDate = value;
      }
      else {
        endDate = value;
      }
      setParams = {
        id: this.id,
        startDate: startDate || this.state.startDate,
        endDate: endDate || this.state.endDate,
        selectedStart,
        selectsStart: !selectedStart,
        selectsEnd: selectedStart,
        value,
      };
    }
    else {
      setParams = {
        id: this.id,
        value,
      };
    }
    // console.log('DateTimeSelector:onChange', selectsStart ? 'start' : 'end', origValue, setParams);
    this.setState(setParams);
    if (typeof onChange === 'function') {
      const cbParams = { ...setParams }; // Convert date values to target date type...
      [ 'value', 'startDate', 'endDate'].forEach(id => {
        const date = cbParams[id];
        if (date) {
          const isEndDate = (id === 'endDate');
          const dateObj = dateUtils.adjustDateValue(date, isEndDate, showTime, timeIntervals);
          cbParams[id + 'Obj'] = dateObj;
          cbParams[id] = dateUtils.convertDateToType(dateObj, dateType);
        }
      });
      onChange(cbParams);
    }
  }

  // Render...

  render() {
    const {
      value,
      startDate,
      endDate,
      selectsStart,
      selectsEnd,
    } = this.state;
    const {
      showTime,
      timeIntervals,
      selectsRange,
      calendarClassName,
    } = this.props;
    const lang = langUtils.getLang();
    const langComponents = lang && lang.components || {};
    const locale = langComponents.lang || config.app.defaultLocale; // TODO?
    const calendarLang = langComponents.calendar || {};
    // console.log('DateTimeSelector:render', {
    //   value,
    //   startDate,
    //   endDate,
    // });
    // @see https://reactdatepicker.com/
    // @see https://github.com/Hacker0x01/react-datepicker
    const datePickerProps = {
      id: this.id,
      inline: true,
      calendarClassName,
      locale, // Causes exception `A locale object was not found for the provided string`
      timeIntervals,
      timeFormat: config.constants.timeFormat,
      dateFormat: config.constants.dateFormat,
      onChange: this.onChange,
      selected: value,
      startDate,
      endDate,
      showTimeSelect: showTime,
      selectsRange,
      selectsStart,
      selectsEnd,
      // TODO: Fetch labels from lang data (lang.components.calendar)...
      timeCaption: calendarLang.timeCaption || 'Time',
      previousYearButtonLabel: calendarLang.previousYearButtonLabel || 'Previous Year',
      nextYearButtonLabel: calendarLang.nextYearButtonLabel || 'Next Year',
      previousMonthButtonLabel: calendarLang.previousMonthButtonLabel || 'Previous Month',
      nextMonthButtonLabel: calendarLang.nextMonthButtonLabel || 'Next Month',
    };
    return (
      <div className={this.getClassName()}>
        <DatePicker {...datePickerProps} />
      </div>
    );
  }

}

export default DateTimeSelector;