import React, { useState, useEffect } from 'react';
import arrowup from '../Assets/arrow-up.svg';
import downarrow from '../Assets/arrow-down.svg';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { homeSuccess } from "./../Redux/_actions/home.action";
import CountryRecords from './../Data/countryRecords';
const Home = () => {
    const dispatch = useDispatch();
    const manageProfileDataR = useSelector(state => state.homeSuccess.data);
    const container = React.createRef();
    const [countryData, setCountryData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedContinent, setSelectedContinent] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [countryDropdown, setCountryDropdown] = useState(false);


    const [continentName, setContinentName] = useState("");
    const [countryName, setCountryName] = useState("");
    const [continentDropDown, setContinentDropDown] = useState(false);
    const [uploadCountryImage, setUploadCountryImage] = useState("");

    let [continentNameError, setContinentNameError] = useState("");
    let [countryNameError, setCountryNameError] = useState("");
    let [uploadCountryImageError, setUploadCountryImageError] = useState("");



    useEffect(() => {
   setCountryData(CountryRecords);

        dispatch(homeSuccess(CountryRecords));
    }, []);

   
    const toggleDropdown = () => {
        setCountryDropdown(!countryDropdown)
    }

    const toggleDropdownContinent = () => {
        setContinentDropDown(!continentDropDown);
    }

    const changeCountry = (event) => {

        const foundValues = countryData?.find((val) => {
            if (val.name === countryData[event].name) {
                return val
            }
        });
        setSelectedCountry(foundValues.name);
        setSelectedContinent(foundValues.continent);
        setSelectedImage(foundValues.image);
        setCountryDropdown(false);
    }



    const changeContinent = (event) => {

        const foundValues = countryData?.find((val) => {
            if (val.continent === countryData[event].continent) {
                return val
            }
            setContinentNameError("");
            document.getElementById('addDorpDownInputHome').style.borderColor = "#B2B2B2";
        });

        setContinentName(foundValues.continent);
        setContinentDropDown(false)
    }

    const handleChangeCountryName = (event) => {
        setCountryName(event.target.value);
        setCountryNameError("");
        document.getElementById('addCountryName').style.borderColor = "#B2B2B2";


    }
    const handleFileUpload = (e) => {
        setUploadCountryImage(e.target.files[0]);
        setUploadCountryImageError("");
        document.getElementById('uploadFile').style.borderColor = "#B2B2B2";
    }
    const validate = () => {
        //let errors = {};
        let isValid = true;
        var patternCharacter = new RegExp(/^[a-zA-Z ]*$/);

        if (!continentName) {
            isValid = false;
            continentNameError = "Required";
            document.getElementById('addDorpDownInputHome').style.borderColor = "#841300";
        } else {
            document.getElementById('addDorpDownInputHome').style.borderColor = "#B2B2B2";
        }

        if (!countryName) {
            isValid = false;
            countryNameError = "Required";
            document.getElementById('addCountryName').style.borderColor = "#841300";
        } else if (!patternCharacter.test(countryName)) {
            isValid = false;
            countryNameError = "Please enter character only";
            document.getElementById('addCountryName').style.borderColor = "#841300";
        }
        else if (countryName && (countryName?.length < 3 || countryName?.length > 20)) {
            isValid = false;
            countryNameError = "Length between 3-20 characters";
            document.getElementById('addCountryName').style.borderColor = "#841300";
        } else {
            document.getElementById('addCountryName').style.borderColor = "#B2B2B2";
        }

        if (!uploadCountryImage) {
            isValid = false;
            uploadCountryImageError = "Required";
            document.getElementById('uploadFile').style.borderColor = "#841300";
        } else {
            document.getElementById('uploadFile').style.borderColor = "#B2B2B2";
        }

        setContinentNameError(continentNameError);
        setCountryNameError(countryNameError);
        setUploadCountryImageError(uploadCountryImageError);

        return isValid;
    }

    const handleSubmit = () => {
        if (validate()) {
          

            let files = uploadCountryImage;
            const reader = new window.FileReader();
            reader.readAsDataURL(files);
            reader.onload = (f) => {


                const formData1 = new window.FormData();
                formData1.append('file', files);
            }

            console.log("mData",manageProfileDataR);
            var obj= {
                "name":countryName ,
                "continent": continentName,
                "image": uploadCountryImage
            }

            var allCData = countryData;
            allCData.push(obj);
            console.log("values", continentName, countryName, uploadCountryImage?.name,allCData);

            dispatch(homeSuccess(allCData));
            
alert("Success");
setContinentName("");
setCountryName("");
setUploadCountryImage("");
        }
    }
    let drop = countryDropdown ? <img src={arrowup} /> : <img src={downarrow} />

    let dropContinent = continentDropDown ? <img src={arrowup} /> : <img src={downarrow} />

    return (
        <>
            <div class="parentHomeMainDiv">
                <div class="parentHomeDiv">
                    <div class="dropDownParentHomeDiv">
                        <div class="dropDownHomeDiv">
                            <div className="pass-wrapper" id="inputDivHome" >
                                <input
                                    readOnly class="form-control form-control-sm outline4"
                                    value={selectedCountry}
                                    placeholder="Select Country"
                                    type="text" id="dorpDownInputHome"
                                />
                                <i id="dropDownIconHome" onClick={toggleDropdown}>{drop}</i>
                            </div>
                            {
                                countryDropdown && (
                                    <div class="dropDownValueDivHome" >
                                        <div class="dropDownValueSubDivHome" ref={container} >
                                            {(countryData?.map((val, index) => {
                                                return (
                                                    <table class='dropDownTableHome' key={index} onClick={() => changeCountry(index)} >
                                                        <td class="dropDownTableTDHome" >
                                                            <small id="dropDownTableSmallHome" >{val?.name} </small>
                                                        </td>
                                                    </table>
                                                );
                                            }))}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {selectedCountry &&
                        <div class="container" id="showDetails">
                            <h2>Country Name :- {selectedCountry}</h2>
                            <p>Continent Name :- {selectedContinent}</p>
                            <img src={selectedImage} class="img-rounded" alt="Country_Image" width="304" height="236" />
                        </div>
                    }
                    {/* for add new info */}

                    <div class="dropDownParentHomeDiv">
                        <h2>Add Country Details!!</h2>
                        <div class="dropDownHomeDiv">
                            <div className="pass-wrapper" id="addinputDivHome" >
                                <input
                                    readOnly class="form-control form-control-sm outline4"
                                    value={continentName}
                                    placeholder="Select Continent"
                                    type="text" id="addDorpDownInputHome"
                                />
                                <div className="error">{continentNameError}</div>
                                <i id="dropDownIconHome" onClick={toggleDropdownContinent}>{dropContinent}</i>
                            </div>
                            {
                                continentDropDown && (
                                    <div class="dropDownValueDivHome" >
                                        <div class="dropDownValueSubDivHome" ref={container} >
                                            {(countryData?.map((val, index) => {
                                                return (
                                                    <table class='dropDownTableHome' key={index} onClick={() => changeContinent(index)} >
                                                        <td class="dropDownTableTDHome" >
                                                            <small id="dropDownTableSmallHome" >{val?.continent} </small>
                                                        </td>
                                                    </table>
                                                );
                                            }))}
                                        </div>
                                    </div>
                                )
                            }


                            <div className="pass-wrapper" id="continentinputDivHome" >
                                <input
                                    class="form-control form-control-sm outline4"
                                    value={countryName}
                                    placeholder="Enter Country Name"
                                    type="text"
                                    id="addCountryName"
                                    onChange={(event) => handleChangeCountryName(event)}
                                />
                                <div className="error">{countryNameError}</div>
                            </div>

                            <div className="pass-wrapper" id="inputDivHome" >
                                <input
                                    class="form-control form-control-sm outline4"
                                  
                                    placeholder="Upload Country Image"
                                    type="file"
                                    name="filename"
                                    id="uploadFile"
                                  
                                    onChange={(e) => handleFileUpload(e)}
                                />
                                <div className="error">{uploadCountryImageError}</div>
                            </div>
                            <button class="btn btn-primary btn-sm" id="submitButton" onClick={() => { handleSubmit() }}>Submit</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;