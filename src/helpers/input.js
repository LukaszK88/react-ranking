import React,{Component} from 'react';
import { Select } from 'semantic-ui-react';
import InputRange from 'react-input-range';
import DatePicker from 'material-ui/DatePicker';

export const input ={
    renderSelect: (field) => {
        const error = !!(field.meta.touched && field.meta.error);
        return(
            <div>
                <Select error={error} { ...field.input } selection onChange={(param,data) => field.input.onChange(data.value)} placeholder={field.placeholder} value={field.input.value} options={field.options}/>
                <div style={{color:'red'}} className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        )
    },
    renderSlider: (field) => {
        return(
            <div>
                <label>{ field.label }</label>
                <InputRange
                    maxValue={field.max}
                    minValue={field.min}
                    { ...field.input }
                />
                <div style={{color:'red'}} className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        );
    },
    renderField:(field) => {

        const className = `form-group ${ field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return(
            <div className={className}>
                <label>{ field.label }</label>
                <input
                    className="form-control"
                    type={field.type}
                    { ...field.input }
                />
                <div style={{color:'red'}} className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        );
    },
    renderTextField: (field) => {
        const className = `form-group ${ field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return(
            <div className={className}>
                <label>{ field.label }</label>
                <textarea
                    className="form-control"
                    { ...field.input }
                ></textarea>
                <div className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        );
    },
    renderDatepicker: (field) => {
        return(
            <div>
                <DatePicker onChange={(event, date) => field.input.onChange(date)} name={field.input.name} value={field.input.value} hintText={field.label} autoOk={true} openToYearSelection={true} />
                <div style={{color:'red'}} className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        )
    }

};