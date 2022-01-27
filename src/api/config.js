import fetchIntercept from "fetch-intercept";
import { toaster } from "evergreen-ui";
import { store } from "@store";

export const base = "http://localhost:3333";
export const app = (path) => `${base}/${path}`;

fetchIntercept.register({
  request: function (url, config) {
    const headers = {};
    if (config.type === "json") {
      headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(config.body);
    }
    if (config.auth) {
      const token = store.getState()?.auth?.token;
      headers.Authorization = `Bearer ${token}`;
    }
    config.headers = headers;
    return [url, config];
  },

  requestError: function (error) {
    console.log("request error", error);
    return Promise.reject(error);
  },

  response: async function (response) {
    try {
      const jsonResponse = await response.json();
      if (jsonResponse.success === false) {
        const errors = jsonResponse.errors.map((error, i) => (
          <div key={i}>
            {error.param} : {error.msg}
          </div>
        ));

        toaster.danger("Error", {
          description: errors,
        });

        return Promise.reject(jsonResponse);
      }
      jsonResponse.message &&
        toaster.success("Success", { description: jsonResponse.message });

      return Promise.resolve(jsonResponse);
    } catch (error) {
      console.log("er", error);
      return Promise.reject(error.message);
    }
  },

  responseError: function (error) {
    return Promise.reject(error);
  },
});

export const jsonFetch = async (
  path,
  { values, auth = false, method = "POST" }
) => {
  return await fetch(app(path), {
    method: method,
    type: "json",
    body: ["POST", "PUT"].includes(method) ? values : undefined,
    auth,
  }).catch((e) => e);
};

export const formDataFetch = async (path, { values, auth = false }) => {
  const formData = new FormData();
  for (let key in values) {
    const value = values[key];
    formData.append(key, value);
  }
  return await fetch(app(path), {
    method: "POST",
    type: "formData",
    body: formData,
    auth,
  }).catch((e) => console.log(e));
};
