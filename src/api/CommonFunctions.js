export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export const setData = async (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
};

export const setValue = async (key, value) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
};

export const getData = async (key) => {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (e) {
    return false;
  }
};

export const getValue = async (key) => {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (e) {
    return false;
  }
};

export const removeData = async (key) => {
  try {
    localStorage.removeItem(key);
    return null;
  } catch (e) {
    return false;
  }
};
