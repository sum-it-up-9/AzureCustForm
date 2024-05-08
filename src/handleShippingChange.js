let extensionService;

const handleShippingChange = async ({event, setWhoPaysShipping, UpdateCartPrice, sleep, cartId, ExtensionCommandType, hideLoadingIndicator}) => {
    // console.log(event.target.value);
    setWhoPaysShipping(event.target.value);
   
    extensionService.post({
        type: ExtensionCommandType.ShowLoadingIndicator,
        payload: { show: true },
    });
    //post message to parent window - hide continue button
    window.top.postMessage(
        "hide-checkout-shipping-continue",
        "https://vivacommerce-b2b-demo-i9.mybigcommerce.com"
    );

    //call azure function to update the product prices
    try {
        await UpdateCartPrice(cartId, event.target.value);
    } catch (e) {
        console.log("Error in UpdateCartPrice", e);
    }

    await sleep(1000);
    hideLoadingIndicator();


    

    console.log(" reload checkout with updated price.");
    extensionService.post({
        type: ExtensionCommandType.ReloadCheckout,
    });
    window.top.postMessage(
        "show-checkout-shipping-continue",
        "https://vivacommerce-b2b-demo-i9.mybigcommerce.com"
    );
};

export default handleShippingChange;