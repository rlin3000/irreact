import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery(
    {
      baseUrl: 'https://api.ireceipts.au:443',
      prepareHeaders: (headers, { getState }) => {
        // Get the access token from Redux state (assuming you've stored it there)
        const accessToken = getState().authx.user?.accessToken || getState().signup.user?.accessToken;

        // If the access token exists, add the Authorization header
        if (accessToken) {
          headers.set('Authorization', `Bearer ${accessToken}`);
        }

        // Add other headers here if needed
        // headers.set('Content-Type', 'application/json');
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
    uploadReceipt: builder.mutation({
      query: (formData) => ({
        url: '/Receipt/UploadReceiptImages/0',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useGetReceiptsQuery, useUpdateReceiptMutation, useUploadReceiptMutation } = api;