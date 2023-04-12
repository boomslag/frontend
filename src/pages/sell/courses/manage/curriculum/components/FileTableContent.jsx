import axios from 'axios';
import React, { useRef, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import moment from 'moment';
import { CircleLoader } from 'react-spinners';
import DeleteEpisodeVideo from '@/api/manage/curriculum/episodes/DeleteVideo';

export default function FileTableContent({
  FetchInstructorSections,
  episode,
  setOpen,
  setSections,
  courseUUID,
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const cancelButtonRef = useRef(null);

  const [editVideo, setEditVideo] = useState(false);

  const [percentage, setPercentage] = useState(0);
  const [loadingFile, setLoadingFile] = useState(false);
  const [salesVideo, setSalesVideo] = useState();
  const [salesVideoFileName, setSalesVideoFileName] = useState();
  const refVideo = useRef();
  const resetVideoInput = () => {
    refVideo.current.value = '';
  };
  const videoSelectedHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    if (file) {
      if (file.type === 'video/mp4' && file.size <= 2000000000) {
        setSalesVideo(file);
      } else {
        alert('Please select a Video of mime type MP4 with size 2GB or lower');
        setSalesVideo(null);
        setSalesVideoFileName(null);
        resetVideoInput();
      }
    }
  };

  const handleVideoReplace = async (e) => {
    e.preventDefault();

    const controller = new AbortController();
    const abortSignal = controller.signal;

    setLoadingFile(true);

    const access = localStorage.getItem('access');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `JWT ${access}`,
      },
    };

    const formData = new FormData();
    formData.append('video', salesVideo);
    formData.append('filename', salesVideoFileName);
    formData.append('episodeUUID', episode.id);

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_COURSES_API_URL}/api/courses/teacher/episodes/add/video/`,
        formData,
        {
          ...config,
          signal: abortSignal,
          onUploadProgress: (data) => {
            setPercentage(Math.round((data.loaded / data.total) * 100));
          },
        },
      );

      if (res.status === 200) {
        const sectionsData = await FetchInstructorSections(courseUUID);
        setSections(sectionsData);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        // eslint-disable-next-line
        console.log('Request canceled', err.message);
      } else {
        // eslint-disable-next-line
        console.log(err);
      }
    } finally {
      controller.abort();
    }

    setLoadingFile(false);
    setOpen(false);
    setSalesVideo(null);
    setSalesVideoFileName(null);
  };

  const handleDeleteVideo = async () => {
    await DeleteEpisodeVideo(episode.id);
    const sectionsData = await FetchInstructorSections(courseUUID);
    setSections(sectionsData);
    setOpen(false);
    setOpenDelete(false);
  };

  return (
    <div className="">
      {editVideo ? (
        <form
          onSubmit={(e) => {
            handleVideoReplace(e);
          }}
          className="pb-14"
        >
          {/* <label htmlFor="email" className="block text-sm font-bold text-gray-900">
                    Video File
                </label> */}
          <div className="flex justify-center">
            <div className="mb-2 w-full">
              <input
                className="form-control
                                    m-0
                                    block
                                    w-full
                                    rounded
                                    border
                                    border-solid
                                    border-gray-300 dark:border-dark-border
                                    dark:bg-dark-second
                                    dark:text-dark-txt
                                    bg-white bg-clip-padding
                                    px-3 py-1.5 text-base
                                    font-normal
                                    text-gray-700
                                    transition
                                    ease-in-out
                                    focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                ref={refVideo}
                onChange={(e) => videoSelectedHandler(e)}
                required
                type="file"
                id="formFile"
              />
              <div className="mt-2 h-1 w-full bg-gray-300 dark:bg-dark-second">
                <div
                  style={{ width: `${percentage}%` }}
                  className={`h-full ${percentage < 70 ? 'bg-rose-600' : 'bg-green-600'}`}
                />
              </div>
            </div>
          </div>
          <p className="font-regular -mb-2 text-xs dark:text-dark-txt-secondary text-gray-500">
            <span className="font-bold text-gray-600 dark:text-dark-txt">Note: </span>
            All files should be at least 720p, .mp4 and less than 4.0 GB.
          </p>
          <div className="float-right mt-4 space-x-2">
            <button
              type="button"
              onClick={() => {
                setEditVideo(false);
              }}
              className="inline-flex cursor-pointer items-center border border-transparent px-4 py-2 text-sm font-medium text-black dark:text-dark-txt hover:bg-gray-50 dark:hover:bg-dark-second"
            >
              Cancel
            </button>
            {loadingFile ? (
              <div className="inline-flex items-center border border-transparent bg-black px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-gray-900">
                <CircleLoader
                  loading={loadingFile}
                  className="inline-flex"
                  size={20}
                  color="#ffffff"
                />
              </div>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center border border-transparent bg-black dark:bg-dark-primary px-4 py-2 text-sm font-bold text-white  shadow-sm hover:bg-gray-900 dark:hover:bg-dark-accent"
              >
                Replace Video
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className=" flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <table className="min-w-full dark:divide-dark-border divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold dark:text-dark-txt text-gray-900 sm:pl-6 md:pl-0"
                    >
                      Filename
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold dark:text-dark-txt text-gray-900"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold dark:text-dark-txt text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold dark:text-dark-txt text-gray-900"
                    >
                      Date
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                      <span className="sr-only">Replace</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium dark:text-dark-txt-secondary text-gray-900 sm:pl-6 md:pl-0">
                      {episode.filename}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm dark:text-dark-txt-secondary text-gray-500">
                      Video
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm dark:text-dark-txt-secondary text-gray-500">
                      Status
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm dark:text-dark-txt-secondary text-gray-500">
                      {moment(episode.date).subtract(10, 'days').calendar()}
                    </td>
                    <td className="relative space-x-2 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0">
                      <button
                        type="button"
                        onClick={() => {
                          setOpenDelete(true);
                        }}
                        className="text-purple-700 dark:text-dark-accent dark:hover:text-dark-primary hover:text-purple-900"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditVideo(true);
                        }}
                        className="text-purple-700 dark:text-dark-accent dark:hover:text-dark-primary hover:text-purple-900"
                      >
                        Replace
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <Transition.Root show={openDelete} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenDelete}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Delete video lecture
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          You are about to remove this video lecture, click ok to continue.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white sm:col-start-2 sm:text-sm"
                      onClick={() => {
                        handleDeleteVideo();
                        setOpenDelete(false);
                      }}
                    >
                      OK
                    </button>
                    <button
                      type="button"
                      className="focus:ring-indigo-500 mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                      onClick={() => setOpenDelete(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
