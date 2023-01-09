import React, { useState } from "react";
import DropdownDate from "react-dropdown-date";
import styles from '../../components/SignUpDates/SignUpDates.module.scss'


export const SignUpDates = () => {
    const formatDate = (date: any) => {
        // formats a JS date to 'yyyy-mm-dd'
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [month, day, year].join("-");
    };


    const [state, setState] = useState({
        date: null,
        selectedDate: "2012-11-15"
    });

    return (
        <div className={styles.signUpModalDatesBox}>
            <div className={styles.signUpModalDateTitle}>
                Date of birth
            </div>
            <p className={styles.signUpModalDateText} >
                This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.
            </p>
            <DropdownDate
                startDate={
                    // optional, if not provided current date is endDate
                    '1902-01-01'
                    // 'yyyy-mm-dd' format only
                }

                // selectedDate={
                //   // optional
                //   this.state.selectedDate // 'yyyy-mm-dd' format only
                // }
                onMonthChange={(month: number) => {
                    // optional
                }}
                onDayChange={(day: number) => {
                    // optional
                }}
                onYearChange={(year: number) => {
                    // optional
                }}
                onDateChange={(date: any) => {
                    // optional
                    setState({ date: date, selectedDate: formatDate(date) });
                }}
                defaultValues={
                    // optional
                    {
                        month: "Month",
                        day: "Day",
                        year: "Year"
                    }
                }
                classes={
                    // optional
                    {
                        dateContainer: 'signUpModalDates',
                        yearContainer: 'signUpModalDateContainer',
                        monthContainer: 'signUpModalDateContainer',
                        dayContainer: 'signUpModalDateContainer',
                        year: 'signUpModalDate',
                        month: 'signUpModalDate',
                        day: 'signUpModalDate',
                        yearOptions: 'modalDateOption',
                        monthOptions: 'modalDateOption',
                        dayOptions: 'modalDateOption'
                    }
                }
            />
            <style jsx global>{`
                    .signUpModalDates {
                        width: 100%;
                        max-width: 612px;
                        display: flex;
                        justify-content: space-between;
                    }
                    
                    .signUpModalDateContainer {
                        border: 1px solid #00000033;
                        height: 60px;
                        border-radius: 6px;
                        transition: border .1s;
                        font-size: 1.125rem;
                        outline: none;
                        display: flex;
                        align-items: center;
                    }

                    .signUpModakDate:focus {
                        border-color: #1E97E1;
                    }
                    
                    .signUpModalDateContainer:nth-child(1) {
                        width: 27%;
                    }
                    
                    .signUpModalDateContainer:nth-child(2) {
                        width: 40%;
                    }
                    
                    .signUpModalDateContainer:nth-child(3) {
                        width: 27%;
                    }
                    .signUpModalDate {
                        font-weight: 500;
                        width:100%;
                        height:100%;
                        border: 2px solid #00000033;
                        font-size: 1rem;
                        outline: none;
                        border-radius: 6px;
                        padding: 15px;
                        color: #00000099;
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        background: transparent;
                        background-image: url("../imgs/SignUpModal/Arrow.svg");
                        background-repeat: no-repeat;
                        background-position-x: 94%;
                        background-position-y: 15px;
                        cursor: pointer;
                    }
                    .signUpModalDate:focus-visible{
                        border-color:#1E97E1;
                    }
                    .signUpModalDate::-webkit-scrollbar {
                        width: 14px;
                    }
                    .signUpModalDate::-webkit-scrollbar-thumb {
                        border: 4px solid rgba(0, 0, 0, 0);
                        background-clip: padding-box;
                        border-radius: 9999px;
                        margin: 10px;
                        background-color: #AAAAAA;
                    }
                    .modalDateOption:first-child {
                        display: none
                    }

                    @media (prefers-color-scheme:dark) {
                        .signUpModalDateContainer {
                            border-color: #333639
                        }
                        .signUpModalDate {
                            color: #d6d9db

                        }
                        .signUpModalDate {
                        background-image: url("../imgs/SignUpModal/WhiteArrow.svg");
                        }
                        .modalDateOption {
                            background: #00000033;
                            color: #000
                        }
                    }
                `}</style>
        </div>
    );
}

