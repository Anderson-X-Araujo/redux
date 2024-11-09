import createAsyncSlice from "./helper/createAsyncSlice";

const slice = createAsyncSlice({
  name: "photos",
  initialState: {
    cache: 6000,
  },
  fetchConfig: () => ({
    url: "https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=10&_user=0",
    options: {
      method: "GET",
      cache: "no-store",
    },
  }),
});

export const getOverFiveKg = (state) => {
  const { data } = state.photos;
  const overFiveKg = data?.filter(({ peso }) => peso >= 5);
  const kgToPound = overFiveKg?.map((photo) => ({
    ...photo,
    peso: Math.floor(photo.peso * 2.20462),
  }));

  return kgToPound;
};

export const fetchPhotos = slice.asyncAction;

export default slice.reducer;

// https://github.com/reduxjs/reselect
