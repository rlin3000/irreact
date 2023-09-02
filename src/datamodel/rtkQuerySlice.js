import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery(
    {
      baseUrl: 'https://irwebapp.azurewebsites.net',
      prepareHeaders: (headers, { getState }) => {
        // Get the access token from Redux state (assuming you've stored it there)
        const accessToken = getState().authx.user?.accessToken || getState().signup.user?.accessToken;

        // If the access token exists, add the Authorization header
        if (accessToken) {
          headers.set('Authorization', `Bearer ${accessToken}`);
        }

        // Add other headers here if needed
        headers.set('Content-Type', 'application/json');
        headers.set('api-version', '0.1');

        return headers;
      },
    }
  ),
  endpoints: (builder) => ({
    getReceipts: builder.query({
      query: () => '/Receipt/GetReceipts',
    }),
    updateReceipt: builder.mutation({
      query: (receiptData) => ({
        url: '/Receipt/UpdateReceipt',
        method: 'POST',
        body: receiptData,
      }),
    }),
  }),
});

export const { useGetReceiptsQuery, useUpdateReceiptMutation } = api;




    // //************ */
    // console.log('user accessToken is ', user.name);
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("api-version", "0.1");
    // myHeaders.append("Authorization", "Bearer " + user.name);

    // var requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow'
    // };

    // fetch("https://irwebapp.azurewebsites.net/Receipt/GetReceipts", requestOptions)
    //   .then(response => response.json())
    //   .then(result => {
    //     console.log('result is ', result.obj[0].companyName);
    //     setUserData(result)
    //   })
    //   .catch(error => console.log('error', error));
    // //*************** */