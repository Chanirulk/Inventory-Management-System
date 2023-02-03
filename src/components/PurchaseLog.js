import react, { useEffect, useState } from "react";

const PurchaseLog = () => {
    let [loaded, setLoaded] = useState(false);
    let [purchaseLog, setPurchaseLog] = useState([]);
    let [compareTime, setCompareTime] = useState("");
    let counter = [];
    for (let i = 0; i < 32; i++) {
        if (i < 10) {
            i = "0" + i;
        }

        counter.push(i);
    }

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    month = (Number(month) + 1);
    if (Number(month) < 10) {
        month = "0" + month;
    }
    let day = date.getDate();
    if (Number(day) < 10) {
        day = "0" + day;
    }

    let hours = date.getUTCHours();
    if (Number(hours) < 10) {
        hours = "0" + hours;
    }


    const timeSearch = () => {
        let selectYr = document.querySelector("select[name='purchaseYr']").value;
        let selectMo = document.querySelector("select[name='purchaseMo']").value;
        if (selectMo === "default") {
            selectMo = "";
        } else {
            selectMo = "-" + selectMo;
        }
        let selectDy = document.querySelector("select[name='purchaseDay']").value;
        if (selectMo === "default" || selectDy == "default") {
            selectDy = "";
        } else {
            selectDy = "-" + selectDy;
        }
        let selectHr = document.querySelector("select[name='purchaseHr']").value;
        if (selectMo === "default" || selectDy === "default" || selectHr == "default") {
            selectHr = "";

        } else {
            selectHr = "T" + selectHr + ":";
        }

        let tempTime = selectYr + selectMo + selectDy + selectHr;

        console.log("tempTme: " + tempTime);

        setCompareTime((compareTime) => tempTime);



    }






    useEffect(() => {
        if (loaded === false) {
            if (localStorage.getItem("purchaseLog")) {
                setPurchaseLog((purchaseLog) => JSON.parse(localStorage.getItem("purchaseLog")));
            }

            setCompareTime((compareTime) => year + "-" + month + "-");

            setLoaded((loaded) => true);

        }
    });



    return (
        <div className="row">
            <div className="col-md-12">
                <h1 className="my-3">Purchase Log</h1>
            </div>
 

            <div className="col-md-3">
                <select name="purchaseYr" className="form-control" onChange={() => timeSearch()}>
                    <option value={year}>{year}</option>
                    <option value={(Number(year) - 1)}>{(Number(year) - 1)}</option>

                </select>
            </div>
            <div className="col-md-3">
                <select name="purchaseMo" className="form-control" onChange={() => timeSearch()}>
                    <option value="default">Select Month</option>

                    {counter.length > 0 ? counter.map((num, i) => {
                        if (Number(num) < 13) {
                            return <option key={i} value={num} selected={month == num ? true : false}>{num}</option>
                        }

                    }) : null}

                </select>
            </div>

            <div className="col-md-3">
                <select name="purchaseDay" className="form-control" onChange={() => timeSearch()}>
                    <option value="default">Select Day</option>

                    {counter.length > 0 ? counter.map((num, i) => {
                        if (Number(num) < 32) {
                            return <option key={i} value={num} >{num}</option>
                        }

                    }) : null}


                </select>
            </div>

            <div className="col-md-3">
                <select name="purchaseHr" className="form-control" onChange={() => timeSearch()}>

                    <option value="default">Select Hour</option>

                    {counter.length > 0 ? counter.map((num, i) => {
                        if (Number(num) < 25) {
                            return <option key={i} value={num} >{num}</option>
                        }

                    }) : null}

                </select>
            </div>

            <div className="col-md-12">
                <ul className="list-group">
                    {purchaseLog.length > 0 ?
                        purchaseLog.map((sale, i) => {
                            if (sale.saleId.indexOf(compareTime) !== -1) {
                                return <li key={i} className="list-group-item"><span className="capitalize">{sale.itemName}</span>{" - $" + sale.price} <span className="badge badge-secondary">{sale.saleId}</span></li>
                            }

                        })
                        : null}
                </ul>
            </div>
        </div>)


}

export default PurchaseLog;