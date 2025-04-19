function About() {
  const my = "my-0 text-center sm:text-left";
  return (
    <div className="mx-auto w-[90vw] sm:w-[50vw] mt-[35vh] mb-20 flex flex-col items-center gap-4">
      {/* <img
      src="/images/lm-photo.jpg"
      alt="Lizzie McGuire"
      className="absolute left-10 w-[50%] h-auto mr-4 mb-2 rounded-lg"
    /> */}
      <h1 className="text-center text-3xl font-semilight m-5">
        Hi! I'm Lizzie! I'm so glad you're here...
      </h1>
      <h3 className="text-center text-lg font-semilight m-3">
        My goal is to help you capture moments you will want to cherish forever
      </h3>

      <p className={`${my}`}>
        I am a wife to my wonderful husband and a mom to a sweet and wiggly
        little boy. When I'm not behind the lens, you can find me playing with
        my little one, spending quality time with friends and family, and
        exploring the outdoors in some form.
      </p>
      <p className={`${my}`}>
        I have been behind a camera for as long as I can remember. Even as a
        child, I would steal my mom's camera and capture moments in my family's
        life and the lives of our friends. Taking photos and documenting the
        life around me has always been such a staple in my life, especially
        because I am so sentimental!
      </p>
      <p className={`${my}`}>
        I believe the life we have been given is such a beautiful gift that
        deserves to be captured and celebrated and YOUR beautiful life deserves
        to be documented and I would be so honored to capture these moments for
        you!
      </p>
      <p className={`${my}`}>
        I look forward to hearing from you and chatting about ways I can best
        serve you!
      </p>
      <p className={`${my} flex flex-row self-start`}>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        Lizzie
      </p>
    </div>
  );
}

export default About;
