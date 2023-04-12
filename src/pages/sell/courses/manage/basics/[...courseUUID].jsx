import React, { useEffect, useState, useCallback } from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';

import ManageCourseLayout from '../components/ManageCourseLayout';
import Navbar from './components/Navbar';

import {
  getCourse,
  updateCourse,
  updateCourseImage,
  updateCourseVideo,
} from '@/redux/actions/courses/courses';
import SetCourseHandle from '@/api/manage/courses/SetCourse';
import TitleSec from './components/TitleSec';
import SubTitleSec from './components/SubTitleSec';
import DescriptionSec from './components/DescriptionSec';
import BasicInfoSec from './components/BasicInfo';
import TaughtSec from './components/TaughtSec';
import ImageGallery from './components/ImageGallery';
import VideoGallery from './components/VideoGallery';
import { useRouter } from 'next/router';

export default function Basics() {
  const router = useRouter();
  const courseUUID = router.query.courseUUID;

  const myUser = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.auth.profile);
  const wallet = useSelector((state) => state.auth.wallet);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const course = useSelector((state) => state.courses.course);
  const title = useSelector((state) => state.courses.title);
  const subTitle = useSelector((state) => state.courses.sub_title);
  const description = useSelector((state) => state.courses.description);
  const language = useSelector((state) => state.courses.language);
  const category = useSelector((state) => state.courses.category);
  const level = useSelector((state) => state.courses.level);
  const taught = useSelector((state) => state.courses.taught);
  const images = useSelector((state) => state.courses.images);
  const videos = useSelector((state) => state.courses.videos);

  const [loading, setLoading] = useState(false);
  const [hasChangesTitle, setHasChangesTitle] = useState(false);
  const [hasChangesSubTitle, setHasChangesSubTitle] = useState(false);
  const [hasChangesDescription, setHasChangesDescription] = useState(false);
  const [hasChangesLanguage, setHasChangesLanguage] = useState(false);
  const [hasChangesLevel, setHasChangesLevel] = useState(false);
  const [hasChangesCategory, setHasChangesCategory] = useState(false);
  const [hasChangesTaught, setHasChangesTaught] = useState(false);
  const [hasChangesImages, setHasChangesImages] = useState(false);
  const [hasChangesVideos, setHasChangesVideos] = useState(false);

  const dispatch = useDispatch();

  const fetchCourse = useCallback(() => {
    dispatch(getCourse(courseUUID));
  }, [dispatch, courseUUID]);

  useEffect(() => {
    if (courseUUID) {
      fetchCourse(courseUUID);
    }
  }, [fetchCourse, courseUUID]);

  const [profileReady, setProfileReady] = useState(false);
  useEffect(() => {
    if (profile && myUser) {
      if (
        (myUser.role === 'seller' &&
          profile.location !== '' &&
          profile.birthday !== '' &&
          profile.profile_info !== '' &&
          profile.facebook !== '') ||
        profile.twitter !== '' ||
        profile.instagram !== '' ||
        profile.linkedin !== '' ||
        profile.youtube !== '' ||
        profile.github !== ''
      ) {
        setProfileReady(true);
      } else {
        setProfileReady(false);
      }
    }
  }, [profile, myUser]);

  const [percentage, setPercentage] = useState(0);
  const onUploadProgress = (progressEvent) => {
    setPercentage(Math.round((progressEvent.loaded * 100) / progressEvent.total));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await SetCourseHandle(courseUUID, true, 'landing');

    const body = JSON.stringify({
      title,
      subTitle,
      description,
      language,
      category,
      level,
      taught,
    });

    const promises = [];

    if (
      hasChangesTitle ||
      hasChangesSubTitle ||
      hasChangesDescription ||
      hasChangesLanguage ||
      hasChangesLevel ||
      hasChangesCategory ||
      hasChangesTaught
    ) {
      promises.push(dispatch(updateCourse(courseUUID, body)));
    }

    if (hasChangesVideos) {
      promises.push(dispatch(updateCourseVideo(courseUUID, videos, onUploadProgress)));
    }
    if (hasChangesImages) {
      promises.push(dispatch(updateCourseImage(courseUUID, images)));
    }

    await Promise.all(promises);

    // setIsSaved(true);
    setLoading(false);
    if (hasChangesTitle) {
      setHasChangesTitle(false);
    }
    if (hasChangesSubTitle) {
      setHasChangesSubTitle(false);
    }
    if (hasChangesDescription) {
      setHasChangesDescription(false);
    }
    if (hasChangesLanguage) {
      setHasChangesLanguage(false);
    }
    if (hasChangesLevel) {
      setHasChangesLevel(false);
    }
    if (hasChangesCategory) {
      setHasChangesCategory(false);
    }
    if (hasChangesTaught) {
      setHasChangesTaught(false);
    }
    if (hasChangesVideos) {
      setHasChangesVideos(false);
    }
    if (hasChangesImages) {
      setHasChangesImages(false);
    }
  };

  return (
    <div>
      <Navbar
        user={myUser}
        isAuthenticated={isAuthenticated}
        course={course && course}
        courseUUID={courseUUID}
        loading={loading}
        setLoading={setLoading}
        hasChangesTitle={hasChangesTitle}
        hasChangesSubTitle={hasChangesSubTitle}
        hasChangesDescription={hasChangesDescription}
        hasChangesLevel={hasChangesLevel}
        hasChangesLanguage={hasChangesLanguage}
        hasChangesCategory={hasChangesCategory}
        hasChangesTaught={hasChangesTaught}
        hasChangesImages={hasChangesImages}
        hasChangesVideos={hasChangesVideos}
        fetchCourse={fetchCourse}
        handleSubmit={handleSubmit}
      />
      <div className="lg:pt-14 " />
      <ManageCourseLayout
        wallet={wallet}
        myUser={myUser}
        isAuthenticated={isAuthenticated}
        course={course}
        courseUUID={courseUUID}
        fetchCourse={fetchCourse}
        title="Course landing page"
      >
        <p className="mb-8 dark:text-dark-txt-secondary">
          Ahoy Cap'n Zenith, fer ye be makin' more doubloons with a well-designed course landin'
          page, there be several things ye can do.
        </p>
        <p className="mb-8 dark:text-dark-txt-secondary">
          Be sure yer landin' page has a clear 'n enticin' headline that communicates the main boon
          of yer course. This headline should grab the attention of ye potential shipmates and lure
          'em to learn more.
        </p>
        <p className="mb-8 dark:text-dark-txt-secondary">
          This knowledge will aid search engines such as Google and Duckduckgo in makin' it simpler
          for sailors to find yer treasure trove of a course.
        </p>

        <div className="space-y-6">
          <TitleSec setHasChangesTitle={setHasChangesTitle} />
          <SubTitleSec setHasChangesSubTitle={setHasChangesSubTitle} />
          <DescriptionSec setHasChangesDescription={setHasChangesDescription} />

          {/* Basic info */}
          <BasicInfoSec
            setHasChangesLanguage={setHasChangesLanguage}
            setHasChangesLevel={setHasChangesLevel}
            setHasChangesCategory={setHasChangesCategory}
          />

          {/* level */}
          <TaughtSec setHasChangesTaught={setHasChangesTaught} />

          {/* thumbnail */}
          <ImageGallery
            course={course}
            setHasChangesImages={setHasChangesImages}
            courseUUID={courseUUID}
          />

          {/* video */}
          <VideoGallery
            course={course}
            setHasChangesVideos={setHasChangesVideos}
            courseUUID={courseUUID}
            percentage={percentage}
          />

          {/* instructor profile */}
          <div className="pb-8">
            <span className="text-md mb-2 block  font-bold dark:text-dark-txt text-gray-900">
              Instructor profile(s)
            </span>
            {profileReady ? (
              <div className="w-full bg-success p-4">
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <CheckCircleIcon className="h-10 w-10 dark:text-dark-txt text-gray-900" />
                  </div>
                  <div>
                    <p className="text-md mt-2 font-bold">All instructor bios are complete</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full bg-error p-4">
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <XMarkIcon className="h-10 w-10 dark:text-dark-txt text-gray-900" />
                  </div>
                  <div>
                    <p className="text-md font-bold dark:text-dark-txt">
                      Instructor(s) bio incomplete
                    </p>
                    <p className="mt-1 text-sm dark:text-dark-txt-secondary">
                      You must have a description, social media links and a way for users to contact
                      you for support.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-4 flex px-4">
              <div className="mr-4 flex-shrink-0 self-center">
                <img
                  alt=""
                  src={profile && profile.picture}
                  className="h-12 w-12 rounded-full object-cover"
                />
              </div>
              <div>
                <p className="mt-1 font-bold dark:text-dark-primary text-purple-600">
                  {myUser && myUser.username}
                </p>
                <a
                  href={`/@${myUser && myUser.username}`}
                  className="mt-1 text-purple-600 dark:text-dark-accent underline underline-offset-2"
                >
                  View instructor profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </ManageCourseLayout>
    </div>
  );
}
