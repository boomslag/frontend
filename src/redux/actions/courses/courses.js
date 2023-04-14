import axios from 'axios';
import { ToastError } from '../../../components/toast/ToastError';
import { ToastSuccess } from '../../../components/ToastSuccess';

import {
  ADD_IMAGE,
  ADD_VIDEO,
  REMOVE_IMAGE,
  REMOVE_VIDEO,
  UPDATE_DRAGGABLES_IMAGE,
  UPDATE_DRAGGABLES_VIDEO,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAIL,
  ADD_WHATLEARNT,
  REMOVE_WHATLEARNT,
  ON_CHANGE_COURSE_WHATLEARNT,
  ON_CHANGE_COURSE_REQUISITE,
  REMOVE_REQUISITE,
  ADD_REQUISITE,
  ADD_WHOISFOR,
  REMOVE_WHOISFOR,
  ON_CHANGE_COURSE_WHOISFOR,
  ON_CHANGE_COURSE_TITLE,
  ON_CHANGE_COURSE_SUB_TITLE,
  ON_CHANGE_COURSE_LANGUAGE,
  ON_CHANGE_COURSE_LEVEL,
  ON_CHANGE_COURSE_CATEGORY,
  ON_CHANGE_COURSE_DESCRIPTION,
  ON_CHANGE_COURSE_TAUGHT,
  ON_CHANGE_COURSE_VIDEO,
  ON_CHANGE_COURSE_IMAGE,
  ON_CHANGE_COURSE_DISCOUNT_UNTIL,
  ON_CHANGE_COURSE_COMPARE_PRICE,
  ON_CHANGE_COURSE_PRICE,
  UPDATE_DRAGGABLES_REQUISITE,
  UPDATE_DRAGGABLES_WHATLEARNT,
  UPDATE_DRAGGABLES_WHOISFOR,
  RESET_CREATE_VARIABLES,
  DEPLOY_COURSE_SUCCESS,
  DEPLOY_COURSE_FAIL,
} from './types';

export const getCourse = (courseUUID) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/teacher/get/${courseUUID}/`,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    } else {
      dispatch({
        type: GET_COURSE_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_COURSE_FAIL,
    });
  }
};

export const resetCourse = () => async (dispatch) => {
  dispatch({
    type: GET_COURSE_FAIL,
  });
};

export const addWhatlearnt = (newItem) => async (dispatch) => {
  dispatch({
    type: ADD_WHATLEARNT,
    payload: newItem,
  });
};

export const removeWhatlearnt = (index) => async (dispatch) => {
  dispatch({
    type: REMOVE_WHATLEARNT,
    payload: index,
  });
};

export const onchangeCourseWhatlearnt = (whatlearntList) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_COURSE_WHATLEARNT,
    payload: whatlearntList,
  });
};

export const updateCourseWhatlearnt = (courseUUID, whatlearntList) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      whatlearntList,
    });
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/whatlearnt/create/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const deleteCourseWhatlearnt = (courseUUID, id) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      id,
    });
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/whatlearnt/delete/`,
      body,
      config,
    );

    if (res.status === 200) {
      // dispatch({
      //   type: EDIT_COURSE_DETAILS_SUCCESS,
      // });
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const addRequisite = (newItem) => async (dispatch) => {
  dispatch({
    type: ADD_REQUISITE,
    payload: newItem,
  });
};

export const removeRequisite = (index) => async (dispatch) => {
  dispatch({
    type: REMOVE_REQUISITE,
    payload: index,
  });
};

export const onchangeCourseRequisite = (requisitesList) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_COURSE_REQUISITE,
    payload: requisitesList,
  });
};

export const updateCourseRequisite = (courseUUID, requisitesList) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      requisitesList,
    });
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/requisites/create/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const deleteCourseRequisite = (courseUUID, id) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      id,
    });
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/requisites/delete/`,
      body,
      config,
    );

    if (res.status === 200) {
      // dispatch({
      //   type: EDIT_COURSE_DETAILS_SUCCESS,
      // });
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const addWhoIsFor = (newItem) => async (dispatch) => {
  dispatch({
    type: ADD_WHOISFOR,
    payload: newItem,
  });
};

export const removeWhoIsFor = (index) => async (dispatch) => {
  dispatch({
    type: REMOVE_WHOISFOR,
    payload: index,
  });
};

export const onchangeCourseWhoIsFor = (whoIsForList) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_COURSE_WHOISFOR,
    payload: whoIsForList,
  });
};

export const updateCourseWhoIsFor = (courseUUID, whoIsForList) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      whoIsForList,
    });
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/who_is_for/create/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (err) {
    // eslint-disable-next-line
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const deleteCourseWhoIsFor = (courseUUID, id) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      id,
    });
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/who_is_for/delete/`,
      body,
      config,
    );

    if (res.status === 200) {
      // dispatch({
      //   type: EDIT_COURSE_DETAILS_SUCCESS,
      // });
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const onchangeCourseTitle = (title) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_COURSE_TITLE,
    payload: title,
  });
};

export const onchangeCourseSubTitle = (subTitle) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_COURSE_SUB_TITLE,
    payload: subTitle,
  });
};

export const onchangeCourseDescription = (description) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_COURSE_DESCRIPTION,
    payload: description,
  });
};

export const onchangeCourseLanguage = (language) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_COURSE_LANGUAGE,
    payload: language,
  });
};

export const onchangeCourseLevel = (level) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_COURSE_LEVEL,
    payload: level,
  });
};

export const onchangeCourseTaught = (taught) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_COURSE_TAUGHT,
    payload: taught,
  });
};

export const onchangeCourseCategory = (category) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_COURSE_CATEGORY,
    payload: category,
  });
};

export const updateCourse = (courseUUID, courseBody) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      courseBody,
    });
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/update/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const updateDraggablesImage = (newList) => async (dispatch) => {
  dispatch({
    type: UPDATE_DRAGGABLES_IMAGE,
    payload: newList,
  });
};

export const addImage = (newItem) => async (dispatch) => {
  dispatch({
    type: ADD_IMAGE,
    payload: newItem,
  });
};

export const removeImage = (index) => async (dispatch) => {
  dispatch({
    type: REMOVE_IMAGE,
    payload: index,
  });
};

export const onchangeCourseImage = (imagesList) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_COURSE_IMAGE,
    payload: imagesList,
  });
};

export const updateCourseImage = (courseUUID, imagesList) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      imagesList,
    });
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/images/create/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const deleteCourseImage = (courseUUID, id) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      id,
    });
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/images/delete/`,
      body,
      config,
    );

    if (res.status === 200) {
      // dispatch({
      //   type: EDIT_COURSE_DETAILS_SUCCESS,
      // });
      // dispatch({
      //   type: REMOVE_IMAGE,
      //   payload: id,
      // });
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const updateDraggablesVideo = (newList) => async (dispatch) => {
  dispatch({
    type: UPDATE_DRAGGABLES_VIDEO,
    payload: newList,
  });
};

export const addVideo = (newItem) => async (dispatch) => {
  dispatch({
    type: ADD_VIDEO,
    payload: newItem,
  });
};

export const removeVideo = (index) => async (dispatch) => {
  dispatch({
    type: REMOVE_VIDEO,
    payload: index,
  });
};

export const onchangeCourseVideo = (videosList) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_COURSE_VIDEO,
    payload: videosList,
  });
};

export const updateCourseVideo = (courseUUID, videosList, onUploadProgress) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const body = JSON.stringify({
      courseUUID,
      videosList,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
      onUploadProgress,
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/videos/create/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const deleteCourseVideo = (courseUUID, id) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      id,
    });
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/videos/delete/`,
      body,
      config,
    );

    if (res.status === 200) {
      // dispatch({
      //   type: EDIT_COURSE_DETAILS_SUCCESS,
      // });
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const onchangeCoursePrice = (price) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_COURSE_PRICE,
    payload: price,
  });
};
export const onchangeCourseComparePrice = (price) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_COURSE_COMPARE_PRICE,
    payload: price,
  });
};
export const onchangeCourseDiscountUntil = (discount) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_COURSE_DISCOUNT_UNTIL,
    payload: discount,
  });
};

export const updateCoursePricing = (courseUUID, courseBody) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      courseBody,
    });

    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/update/pricing/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
    return res;
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
    return null;
  }
};

export const updateDraggablesRequisite = (newList) => async (dispatch) => {
  dispatch({
    type: UPDATE_DRAGGABLES_REQUISITE,
    payload: newList,
  });
};

export const updateDraggablesWhatLearnt = (newList) => async (dispatch) => {
  dispatch({
    type: UPDATE_DRAGGABLES_WHATLEARNT,
    payload: newList,
  });
};

export const updateDraggablesWhoIsFor = (newList) => async (dispatch) => {
  dispatch({
    type: UPDATE_DRAGGABLES_WHOISFOR,
    payload: newList,
  });
};

export const resetCreateVariables = () => async (dispatch) => {
  dispatch({
    type: RESET_CREATE_VARIABLES,
  });
};

export const updateCourseWelcomeMessage = (courseUUID, message) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      message,
    });
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/update/welcome_message/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const updateCourseCongratsMessage = (courseUUID, message) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      message,
    });
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/update/congrats_message/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const updateCourseStatus = (courseUUID, bool) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      bool,
    });
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/publish/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const createCourseNFT = (courseUUID, price) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      price,
    });
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_CRYPTO_API_URL}/api/courses/nft_deploy/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: DEPLOY_COURSE_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const resetCourseNFT = () => async (dispatch) => {
  dispatch({
    type: DEPLOY_COURSE_FAIL,
  });
};

export const updateCourseKeywords = (courseUUID, keywords) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      keywords,
    });
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/edit/keywords/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
      ToastSuccess(`Keywords saved`);
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const updateCourseStock = (courseUUID, stock) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      stock,
    });
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/edit/stock/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
      ToastSuccess(`Stock saved`);
    }
  } catch (err) {
    ToastError(`Error: ${err.response.statusText}`);
  }
};

export const updateCourseSlug = (courseUUID, slug) => async (dispatch) => {
  try {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      courseUUID,
      slug,
    });
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/edit/slug/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: res.data.results,
      });
      ToastSuccess(`Slug saved`);
    }
  } catch (err) {
    // eslint-disable-next-line
    ToastError(`Error: ${err.response.data.error}`);
  }
};
