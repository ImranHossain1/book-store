import { api } from "../../api/apiSlice";

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    postBook: builder.mutation({
      query: ({ data }) => ({
        url: `/book`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/review/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    getReview: builder.query({
      query: (id) => `/review/${id}`,
      providesTags: ["book"],
    }),
    postWishlist: builder.mutation({
      query: ({ data }) => ({
        url: `/wishlist`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    getWishlist: builder.query({
      query: () => "/wishlist",
    }),
    singleWishlist: builder.query({
      query: (id) => `/wishlist/${id}`,
    }),
    postReadingList: builder.mutation({
      query: ({ data }) => ({
        url: `/readinglist`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    getReadingList: builder.query({
      query: () => "/readinglist",
    }),
    singleReadimgList: builder.query({
      query: (id) => `/readinglist/${id}`,
    }),
    updateReadingList: builder.mutation({
      query: ({ id, data }) => ({
        url: `/readinglist/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  usePostBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  usePostReviewMutation,
  useGetReviewQuery,
  usePostWishlistMutation,
  useGetWishlistQuery,
  useSingleWishlistQuery,
  usePostReadingListMutation,
  useGetReadingListQuery,
  useSingleReadimgListQuery,
  useUpdateReadingListMutation,
} = booksApi;
