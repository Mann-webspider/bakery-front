

const stripePublicKey = 'pk_test_51N9YCGSEIF6HvjniEsEYPlLdt6aeJ9jASELIrnTn2kyQ6DAyFQoQqibg4vaAaEVxaJ7Xd8tufAqvNA56HXlGGn4L00gYKnGD80';
const stripe = Stripe(stripePublicKey);
const loader = document.querySelector(".loader");
async function sendItem(id){
    loader.classList.remove("hidden")
    const quan = document.querySelector(`#${id}`).value
    console.log("i clicked");
    const res =await fetch("https://bakery-topaz-rho.vercel.app/create-checkout-session",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            
                id:id,
                quantity:quan
            
        })
       
        
    }).then((response)=>{
        return response.json();

    }).then((data)=>{
        const {sessionId} = data;
         stripe.redirectToCheckout({
              sessionId: sessionId
            });
    }).catch((e)=>{
        console.log(e);
    }).finally(()=>{
        loader.classList.add("hidden")

        console.log(sessionId);
    })

}


// Function to convert client's timezone date and time to local timezone
function convertToLocalTime(clientDateTime, clientTimezone) {
    // Parse the client's date and time using the client's timezone
    const clientMoment = moment.tz(clientDateTime, clientTimezone);
    
    // Convert the client's date and time to the local timezone
    const localMoment = clientMoment.clone().tz('Asia/Kolkatta'); // Replace 'Your_Local_Timezone' with your desired local timezone
    
    // Format the local date and time
    const localDateTime = localMoment.format('YYYY-MM-DD HH:mm:ss');
    
    return localDateTime;
  }
  
  // Example usage
  const clientDateTime = '2023-04-10 14:00:00'; // Replace with the client's date and time in their timezone
  const clientTimezone = 'Asia/Karachi'; // Replace with the client's timezone
  
  const localDateTime = convertToLocalTime(clientDateTime, clientTimezone);
  console.log('Local Date and Time:', localDateTime);
  console.log("hello");
  
