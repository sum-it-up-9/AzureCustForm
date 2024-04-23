import React, { useState,useEffect } from "react";

const CustomerPreferred = {
  CarrierName: {
    label: "Carrier Name",
    type: "text",
    formName: "CustomerPreferredObj",
  },
  ContactName: {
    label: "Contact Name",
    type: "text",
    formName: "CustomerPreferredObj",
  },
  Name: {
    label: "Name",
    type: "text",
    formName: "CustomerPreferredObj",
  },
  ContactPhone: {
    label: "Contact Phone",
    type: "text",
    formName: "CustomerPreferredObj",
  },
  Address1: {
    label: "Address 1",
    type: "text",
    formName: "CustomerPreferredObj",
  },
  Address2: {
    label: "Address 2",
    type: "text",
    formName: "CustomerPreferredObj",
  },
  State: {
    label: "State",
    type: "dropdown",
    formName: "CustomerPreferredObj",
  },
  City: {
    label: "City",
    type: "text",
    formName: "CustomerPreferredObj",
  },
  Zip: {
    label: "Zip",
    type: "text",
    formName: "CustomerPreferredObj",
  },
  Country: {
    label: "Country",
    type: "dropdown",
    formName: "CustomerPreferredObj",
  },
};

const WillCall = {
  ContactName: {
    lable: "Contact Name",
    type: "text",
    formName: "WillCallObj",
  },
  ContactEmail: {
    lable: "Contact Email",
    type: "email",
    formName: "WillCallObj",
  },
  ContactPhone: {
    lable: "Contact Phone",
    type: "text",
    formName: "WillCallObj",
  },
};

const UPS = {
  Ground: {
    label: "Ground",
    type: "radio",
    formName:"UPSObj"
  },
  "2nd Day Air": {
    label: "2nd Day Air",
    type: "radio",
    formName:"UPSObj"
  },
  "2nd Day Air AM": {
    label: "2nd Day Air AM",
    type: "radio",
    formName:"UPSObj"
  },
  "3 Day Select": {
    label: "3 Day Select",
    type: "radio",
    formName:"UPSObj"
  },
  "Next Day Air": {
    label: "Next Day Air",
    type: "radio",
    formName:"UPSObj"
  },
  "Next Day Air AM": {
    label: "Next Day Air AM",
    type: "radio",
    formName:"UPSObj"
  },
  "Next Day Air Saver": {
    label: "Next Day Air Saver",
    type: "radio",
    formName:"UPSObj"
  },
};

const FedEx = {
  Ground: {
    label: "Ground",
    type: "radio",
    formName: "FedExObj",
  },
  "1DayFreight": {
    label: "1 Day Freight",
    type: "radio",
    formName: "FedExObj",
  },
  "2Day": {
    label: "2 Day",
    type: "radio",
    formName: "FedExObj",
  },
  "2DayFreight": {
    label: "2 Day Freight",
    type: "radio",
    formName: "FedExObj",
  },
  "3DayFreight": {
    label: "3 Day Freight",
    type: "radio",
    formName: "FedExObj",
  },
  ExpressSaver: {
    label: "Express Saver",
    type: "radio",
    formName: "FedExObj",
  },
  FirstOvernight: {
    label: "First Overnight",
    type: "radio",
    formName: "FedExObj",
  },
  GroundHomeDelivery: {
    label: "Ground Home Delivery",
    type: "radio",
  },
  PriorityOvernight: {
    label: "Priority Overnight",
    type: "radio",
    formName: "FedExObj",
  },
  StandardOvernight: {
    label: "Standard Overnight",
    type: "radio",
    formName: "FedExObj",
  },
};

let extensionService;
const ExtensionCommandType = {
  ReloadCheckout: "EXTENSION:RELOAD_CHECKOUT",
  ShowLoadingIndicator: "EXTENSION:SHOW_LOADING_INDICATOR",
  SetIframeStyle: "EXTENSION:SET_IFRAME_STYLE"
}

const CustomForm = () => {
  const [formData, setFormData] = useState({});
  const [accountNumber, setAccountNumber] = useState(0);
  const [sellarsShipper, setSellarsShipper] = useState("Prepaid Truckload");
  const [checkoutid, setCheckoutid] = useState(0);

  const [customerPreferredObj, setCustomerPreferredObj] = useState({
    CarrierName: "",
    ContactName: "",
    Name: "",
    ContactPhone: "",
    Address1: "",
    Address2: "",
    State: "",
    City: "",
    Zip: "",
    Country: "",
  });

  const [WillCallObj, setWillCallObj] = useState({
    ContactName: "",
    ContactPhone: "",
    ContactEmail: "",
  });

  const [FedExObj, setFedExObj] = useState("Ground");
  const [UPSObj, setUPSObj] = useState("Ground");

  const [whoPaysShippping, setWhoPaysShipping] = useState(
    "Sellars Pays Freight"
  );
  const [isUsingFedExAccount, setIsUsingFedExAccount] = useState("Yes");
  const [isDisplayingAccountNumber, setIsDisplayingAccountNumber] =
    useState("FedEx");
  const [FormFields, setFormFields] = useState(FedEx);
  console.log(typeof FormFields);
  const [selectedRadioOption, setSelectedRadioOption] = useState("Ground");

  // const handleSubmit = () => {
  //   console.log("handlesubmit called");
  //   fetch(`http://localhost:3000/cart/cart1`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Response from server:", data);
  //       // Do something with the response data
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  const handleRadioOptionChange = (event) => {
    setSelectedRadioOption(event.target.value);
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };
  const [selectedShipper, setSelectedShipper] = useState("FedEx");

  const handleShippingChange = (event) => {
    // console.log(event.target.value);
    setWhoPaysShipping(event.target.value);
  };

  const handleSellersShipperChange = (e) => {
    setSellarsShipper(e.target.value);
  };

  function handleWillCallChange(e) {
    setWillCallObj((prev) => {
      console.log({ ...prev, [e.target.name]: e.target.value });
      //console.log(e.target.name, e.target.value);
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleFedExChange(e) {
    setFedExObj(e.target.value);
    console.log("change", e.target.value);
  }

  function handleUPSChange(e) {
    setUPSObj(e.target.value);
  }

  function handleCustomerPreferredChange(e) {
    setCustomerPreferredObj((prev) => {
      //console.log({...prev,[e.target.name]:e.target.value});
      //console.log(e.target.name, e.target.value);
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const handleShipperChange = (event) => {
    const Shipper = event.target.value;
    console.log("shipper to use: ", event.target.value);
    setSelectedShipper(Shipper);
    // setFormFields(event.target.value);
    if (Shipper === "UPS") {
      setFormFields(UPS);
      setIsDisplayingAccountNumber("UPS");
    } else if (Shipper === "Will Call") {
      setFormFields(WillCall);
      setIsDisplayingAccountNumber("WillCall");
    } else if (Shipper === "FedEx") {
      setFormFields(FedEx);
      setIsDisplayingAccountNumber("FedEx");
    } else if (Shipper === "Customer Preferred Carrier") {
      setFormFields(CustomerPreferred);
      setIsDisplayingAccountNumber("Customer Preferred Carrier");
    }
  };

  const renderFormField = (fieldName, fieldType, formName) => {
    //console.log(fieldName, "name");
    // console.log(fieldType, "fieldType");
    //console.log(fieldOptions, "sdf");
    console.log("called");
    if (fieldType.type === "text") {
      return (
        <>
          {fieldName}
          <input
            type="text"
            name={fieldName}
            value={formName[fieldName]}
            onChange={(e) => {
              if (formName === "FedExObj") {
                handleFedExChange(e);
              } else if (formName === "WillCallObj") {
                handleWillCallChange(e);
              } else if (formName === "UPSObj") {
                handleUPSChange(e);
              } else if (formName === "CustomerPreferredObj") {
                handleCustomerPreferredChange(e);
              }
            }}
            placeholder={fieldName}
          />
        </>
      );
    } else if (fieldType.type === "dropdown") {
      let fieldOptions = [1, 2, 3, 4];
      return (
        <select
          name={fieldName}
          value={fieldType[fieldName]}
          onChange={(e) => {
            if (formName === "FedExObj") {
              handleFedExChange(e);
            } else if (formName === "WillCallObj") {
              handleWillCallChange(e);
            } else if (formName === "UPSObj") {
              handleUPSChange(e);
            } else if (formName === "CustomerPreferredObj") {
              handleCustomerPreferredChange(e);
            }
          }}
        >
          <option value="">Select {fieldName}</option>
          {fieldOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else if (fieldType.type === "radio") {
      return (
        <div>
          <input
            type="radio"
            name={fieldName}
            value={fieldType.label}
            checked={
              formName === "FedExObj"
                ? FedExObj === fieldType.label
                : UPSObj === fieldType.label
            }
            onChange={(e) => {
              if (formName === "FedExObj") {
                handleFedExChange(e);
              } else if (formName === "UPSObj") {
                handleUPSChange(e);
              }
            }}
          />
          {fieldType.label}
        </div>
      );
    } else if (fieldType.type === "email") {
      return (
        <>
          <label htmlFor={fieldName}>{fieldType.lable}</label>

          <input
            id={fieldName}
            type="email"
            name={fieldName}
            value={formName[fieldName]}
            onChange={(e) => {
              if (formName === "FedExObj") {
                handleFedExChange(e);
              } else if (formName === "WillCallObj") {
                handleWillCallChange(e);
              } else if (formName === "UPSObj") {
                handleUPSChange(e);
              } else if (formName === "CustomerPreferredObj") {
                handleCustomerPreferredChange(e);
              }
            }}
            placeholder="Enter email"
          />
        </>
      );
    }
  };

  const handleFedExAccountChange = (e) => {
    setIsUsingFedExAccount(e.target.value);
  };

  // async function updateCartDiscount() {
  //   console.log('inside updateCartDiscount ');
  //   const myHeaders = new Headers(); 
  //   myHeaders.append("X-Auth-Token", "44v4r4o38ki0gznr4kn5exdznzft69c"); 
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append( 'Access-Control-Allow-Origin', '*');
  //   //const raw = JSON.stringify({ "cart": { "discounts": [{ "discounted_amount": 2, "name": "manual" }] } });

  //   const checkoutid = cart.id; 
  //   const res=await fetch(`https://api-hit-pied.vercel.app/discount/${checkoutid}`, { method: "GET", headers: myHeaders, redirect: "follow" });
  //   const data= await res.json();
  //   console.log('updated cart value returned from dicounted api: ',data);
  // }

  async function updateCartDiscount() {
    console.log('inside updateCartDiscount ');
    const myHeaders = new Headers(); 


    myHeaders.append("Content-Type", "application/json");
    myHeaders.append( 'Access-Control-Allow-Origin', '*');
    //const raw = JSON.stringify({ "cart": { "discounts": [{ "discounted_amount": 2, "name": "manual" }] } });

    
    const res=await fetch(`https://api-hit-pied.vercel.app/discount/${checkoutid}`, { method: "GET", headers: myHeaders, redirect: "follow" });
    const data= await res.json();
    console.log('updated cart value returned from discounted api: ',data);
    console.log('reload checkout');
    extensionService.post({ type: ExtensionCommandType.ReloadCheckout });
  }


  const handleSubmit = () => {
   
    

    fetch(`https://api-hit-pied.vercel.app/cart/cart1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'

      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from server:', data);
        updateCartDiscount();
        //cart.cartAmount = 200;
        // Do something with the response data
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  useEffect(() => {

    checkoutKitLoader.load('extension').then(async function(module) {
      console.log("Checkout loader - extension")
      const params = new URL(document.location).searchParams;

        console.log("params: ",params);

        const extensionId = params.get('extensionId');
        console.log('this is exctention id: ',extensionId)
        const cartId = params.get('cartId');
       
        console.log('this is card id: ',cartId)
        const parentOrigin = params.get('parentOrigin');
        console.log('this is parentOrigin: ',parentOrigin)




         extensionService = await module.initializeExtensionService({
          extensionId,
          parentOrigin,
          taggedElementId: 'container',
        });

        setCheckoutid(cartId);
      
    
    });

   
    // Cleanup function
    return () => {
      // Cleanup code if necessary
    };
  }, []);


  return (
    <div id="container">
      <div>
        <div>
          <div>Who Pays Shipping</div>
          <select onChange={handleShippingChange} name="" id="">
            <option value="Sellars Pays Freight">Sellars Pays Freight</option>
            <option value="Customer Pays Freight">Customer Pays Freight</option>
          </select>
        </div>

        {whoPaysShippping === "Sellars Pays Freight" ? (
          <div>
            <div>Shipper To Use</div>
            <select onChange={handleSellersShipperChange} name="" id="">
              <option value="Prepaid Truckload">Prepaid Truckload</option>
              <option value="Prepaid LTL">Prepaid LTL</option>
            </select>
          </div>
        ) : (
          <>
            <div>
              <div>Shipper To Use</div>
              <select onChange={handleShipperChange} name="" id="">
                <option value="FedEx">FedEx</option>
                <option value="Customer Preferred Carrier">
                  Customer Preferred Carrier
                </option>

                <option value="UPS">UPS</option>
                <option value="Will Call">Will Call</option>
              </select>
            </div>
            {isDisplayingAccountNumber === "Customer Preferred Carrier" ||
            isDisplayingAccountNumber === "UPS" ? (
              <div>
                <div>Account Number</div>
                <input type="text" />
              </div>
            ) : null}

            {isDisplayingAccountNumber === "FedEx" && (
              <>
                <div>
                  <label htmlFor="useFedExAccount">Use My FedEx Account</label>
                </div>
                <select
                  onChange={handleFedExAccountChange}
                  name="useFedExAccount"
                  id="useFedExAccount"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                {isUsingFedExAccount === "Yes" && (
                  <div>
                    <div>Account Number</div>
                    <input type="text" />
                  </div>
                )}
              </>
            )}

            <div></div>

            <div>
              <h2>Dynamic Form</h2>
              <div>
                {Object.entries(FormFields).map(([fieldName, fieldType]) => (
                  <div key={fieldName}>
                    {renderFormField(fieldName, fieldType, fieldType?.formName)}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div>
          <div>
            <label htmlFor="specialInstructions">Special Instructions</label>
          </div>
          <textarea
            name="specialInstructions"
            id="specialInstructions"
            onChange={() => {}}
            rows={4} // Set the number of visible text lines
            cols={25} // Set the number of visible text columns
          />
        </div>
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CustomForm;
