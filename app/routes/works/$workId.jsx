import { useLoaderData, Link } from "remix";
import { checkStatus, checkEnvVars } from "~/utils/errorHandling";

import stylesUrl from "~/styles/tailwind.css";

export function links() {
  return [{ rel: "stylesheet", href: stylesUrl }];
}

export function meta({ data }) {
  return {
    title: data.attributes.Name,
  };
}

export async function loader({ params }) {
  console.log("params-->", params);
  checkEnvVars();

  const res = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/work1s` +
      `?populate=*&filters[title]=${params.workId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  // Handle HTTP response code < 200 or >= 300
  checkStatus(res);

  const data = await res.json();
  console.log("DATA======-->", data);

  // Did Strapi return an error object in its response?
  if (data.error) {
    console.log("Error", data.error);
    throw new Response("Error getting data from Strapi", { status: 500 });
  }

  // Did Strapi return an empty list?
  if (!data.data || data.data.length === 0) {
    throw new Response("Not Found", { status: 404 });
  }

  const works = data.data[0];

  //   // For a Tip with no screenshot, replace API returned null with an empty array
  //   tip.attributes.Screenshots.data = tip.attributes.Screenshots.data ?? [];

  //   // Handle image URL being returned as just a path with no scheme and host.
  //   // When storing media on the filesystem (Strapi's default), media URLs are
  //   // return as only a URL path. When storing media using Cloudinary, as we do
  //   // in production, media URLs are returned as full URLs.
  //   for (const screenshot of tip.attributes.Screenshots.data) {
  //     if (!screenshot.attributes.formats.thumbnail.url.startsWith('http')) {
  //       screenshot.attributes.formats.thumbnail.url = process.env.STRAPI_URL_BASE +
  //         screenshot.attributes.formats.thumbnail.url;
  //     }
  //   }
  return works;
}

export default function WorkRoute() {
  const work = useLoaderData();
  console.log("work===>>", work);
  return (
    <>
      <section className="pt-[4.375rem] pb-[3.75rem]">
        <div className="container">
          <div className="flex justify-between items-center flex-wrap md:flex-nowrap md:pb-5 pb-8">
            <h2 className="text-primary text-base font-gorditabold w-full mb-3 md:mb-0">
              {work.attributes.field}
            </h2>
          </div>
          <div className="title-sec w-full md:max-w-[28.75rem] relative">
            <h1 className="text-[2.5rem] pb-1 font-blancotrialbold leading-[3.75rem]">
              {work.attributes.title}
              <span className="bg-orangecol w-2 h-2 rounded-full inline-block ml-1"></span>
            </h1>
            <p className="text-base md:font-gorditamedium font-gorditaregular leading-[1.7rem] text-grey">
              {work.attributes.subTitle}
            </p>
          </div>
        </div>
      </section>
      <section className="pb-[6.25rem]">
        <div
          // style={{
          //   backgroundImage: `url("http://172.16.16.49:3000/${pbg}")`,
          // }}
          className={`w-full bg-[url('/assets/images/p-bg.webp')] bg-no-repeat bg-cover pt-10 pb-10 mb-20 text-center`}
        >
          <img
            src={
              work.attributes.heroImage.data.attributes.url
            }
            alt={work.heroImageAlt}
            className="w-full h-auto flex flex-col justify-center items-center m-auto  md:max-w-[60%]"
            loading="eager"
          />
        </div>
        <div className="container lg:px-4 px-0">
          <div className="title-sec m-auto w-full max-w-[46.625rem] px-4 lg:px-0">
            <h2 className="text-[2rem] pb-1 font-blancotrialbold leading-[3.25rem] text-center">
              Project brief
              <span className="bg-orangecol w-2 h-2 rounded-full inline-block ml-1"></span>
            </h2>
            <p className="text-base md:font-gorditamedium font-gorditaregular leading-[1.7rem] text-center text-grey">
              {work.attributes.description}
            </p>
          </div>
          <div
            // style={{
            //   backgroundImage: `url("http://172.16.16.49:3000/${testimonial}")`,
            // }}
            className="pt-[4.813rem] md:pb-20 pb-10 bg-[url('/assets/images/testimonial.webp')] bg-no-repeat md:bg-auto bg-cover md:bg-[top_-3rem_center] bg-center w-full"
          >
            <ul className="flex flex-wrap justify-between max-w-[58.75rem] w-full m-auto lg:p-0 px-4">
              <li className="lg:max-w-[calc(20%-0.75rem)] md:max-w-[calc(50%-0.75rem)] w-full mb-5 lg:mb-0 rounded-[0.625rem]  md:p-4 p-4 flex flex-col items-center justify-center shadow-9xl md:bg-white-600 bg-white-900">
                <div className="text-left">
                  <h3 className="text-[1.25rem] pb-1 font-blancotrialbold leading-[3.25rem]">
                    budget
                    <span className="bg-orangecol w-1 h-21 rounded-full inline-block ml-1"></span>
                  </h3>
                  <h4 className="text-base text-grey font-gorditamedium">
                    ${work.attributes.tags["budget"]}
                  </h4>
                </div>
              </li>
              <li className="lg:max-w-[calc(20%-0.75rem)] md:max-w-[calc(50%-0.75rem)] w-full mb-5 lg:mb-0 rounded-[0.625rem] md:p-4 p-4 flex flex-col items-center justify-center shadow-9xl md:bg-white-600 bg-white-900">
                <div className="text-left">
                  <h5 className="text-[1.25rem] pb-1 font-blancotrialbold leading-[3.25rem]">
                    duration
                    <span className="bg-orangecol w-1 h-21 rounded-full inline-block ml-1"></span>
                  </h5>
                  <h4 className="text-base text-grey font-gorditamedium">
                    {work.attributes.tags["duration"]}
                  </h4>
                </div>
              </li>
              <li className="lg:max-w-[calc(60%-0.75rem)] md:max-w-[calc(100%-0.75rem)] w-full rounded-[0.625rem] md:p-5 p-5 flex flex-col items-center justify-center shadow-9xl md:bg-white-600 bg-white-900">
                <div className="text-left">
                  <h5 className="text-[1.25rem] pb-1 font-blancotrialbold leading-[3.25rem]">
                    deliverables
                    <span className="bg-orangecol w-1 h-21 rounded-full inline-block ml-1"></span>
                  </h5>
                  <ul className="flex flex-wrap">
                    {work.attributes.tags["deliverables"].map((value, idx) => (
                      <li
                        key={idx}
                        className="text-sm leading-4 text-grey font-gorditamedium px-[1.375rem] py-2 bg-white-200 rounded-3xl md:mr-3 mr-2.5 mb-[0.625rem]"
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
            <div className="text-center pt-20">
              <a
                href={work.attributes.url}
                target="_blank"
                className="text-white bg-primary text-base text-center rounded-full px-12 py-4 min-w-[12.5rem] font-gorditamedium hover:bg-orange-500 hover:text-white transition-all"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-6">
        <div className="container">
          <div className="flex justify-between items-center flex-wrap lg:flex-nowrap lg:p-0 px-4">
            <div className="title-sec w-full lg:max-w-[28.50rem] max-w-full md:pr-12 lg:mb-0 mb-8">
              <h2 className="text-[2rem] pb-1 font-blancotrialbold leading-[3.25rem]">
                Technology stack we use
                <span className="bg-orangecol w-2 h-2 rounded-full inline-block ml-1"></span>
              </h2>
            </div>
            {console.log(work.attributes.technologies)}
            <div className="overflow-x-scroll lg:overflow-x-hidden lg:pl-12 lg:w-[calc(100%-28.50rem)]">
              <ul className="flex lg:justify-center justify-start items-center lg:flex-wrap flex-nowrap w-full max-w-[calc(100% - 37.188rem)] w-[64rem] lg:w-auto">
                {work.attributes.technologies.map(({ name, image, alt }, idx) => {
                  return (
                    <li
                      key={`${name}-${idx}`}
                      className="flex flex-col shadow-8xl border border-[#EAEAEA] h-36 w-[11.688rem] md:w-full md:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.3%-1rem)] mx-2 mb-4 items-center justify-center rounded-[0.625rem]"
                    >
                      {image.extension === "svg" ? (
                        <img loading="lazy" src={image.publicURL} alt={alt} />
                      ) : (
                        <img src={image} alt={alt} />
                      )}
                      <p className="text-base font-gorditamedium text-black pt-3">
                        {name}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="container">
          <div className="title-sec m-auto w-full md:pb-10 pb-6">
            <h2 className="md:text-[2rem] text-[1.625rem] pb-1 font-blancotrialbold md:leading-[3.25rem] leading-[2.4rem] text-center">
              Glimpse of the project
              <span className="bg-orangecol w-2 h-2 rounded-full inline-block ml-1"></span>
            </h2>
          </div>
        </div>
        {console.log(work.attributes.web_mockup_images)}
        {work.attributes.web_mockup_images.data && (
          <div className="md:bg-gradient-to-t to-[rgba(252,252,253,0)] from-[#F5F5FB]">
            <div className="container">
              <div className="flex flex-wrap justify-between items-end">
                {work.attributes.web_mockup_images.data.map((image, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`${
                        work.attributes.web_mockup_images.data.length === 2
                          ? "md:w-[calc(50%-0.938rem)]"
                          : "md:w-[calc(33.333333%-0.938rem)]"
                      } w-full md:text-left text-center ${
                        idx !== 3 && "md:mb-0 mb-7"
                      }`}
                    >
                      <img
                        src={image.attributes.url}
                        alt="web_mockup_images"
                        className="md:w-full w-10/12 mx-auto"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {console.log(work.attributes.tablet_mockup_images)}

        {work.attributes.tablet_mockup_images.data && (
          <div className="md:bg-gradient-to-t to-[rgba(252,252,253,0)] from-[#F5F5FB] pt-20">
            <div className="container">
              <div className="flex flex-wrap justify-between items-end">
                {work.attributes.tablet_mockup_images.data.map((image, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`${
                        work.attributes.tablet_mockup_images.data.length === 2
                          ? "md:w-[calc(50%-0.938rem)]"
                          : "md:w-[calc(33.333333%-0.938rem)]"
                      } w-full md:text-left text-center ${
                        idx !== 3 && "md:mb-0 mb-7"
                      }`}
                    >
                      <img
                        src={image.attributes.url}
                        alt="tablet_mockup_images"
                        className="md:w-full w-10/12 mx-auto"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      {work.attributes.mobile_mockup_images.data && (
        <section className="pt-20">
          <div className="md:bg-gradient-to-t to-[rgba(252,252,253,0)] from-[#F5F5FB]">
            <div className="container">
              <div className="flex flex-wrap justify-between items-end">
                {work.attributes.mobile_mockup_images.data.map((image, idx) => {
                  return (
                    <div
                      key={idx}
                      className="md:w-[calc(33.333333%-0.938rem)] w-full md:mb-0 mb-7 md:text-left text-center"
                    >
                      <img
                        src={image.attributes.url}
                        alt="mobile_mockup_images"
                        className="md:w-full w-10/12 mx-auto"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="md:pb-[6.875rem] pb-[4rem] pt-20">
        {work.attributes.wireframeImage.data && (
          <div className="title-sec m-auto w-full md:pb-10 pb-6">
            <h2 className="md:text-[2rem] text-[1.625rem] pb-3 font-blancotrialbold md:leading-[3.25rem] leading-[2.4rem] text-center">
              Wireframes
              <span className="bg-orangecol w-2 h-2 rounded-full inline-block ml-1"></span>
            </h2>
            <img
              src={work.attributes.wireframeImage.data.attributes.url}
              alt={work.attributes.title + " image"}
            />
          </div>
        )}
        {/* <div className="flex items-center justify-center md:mt-16 mt-0">
          {prev && (
            <Link
              to={`/portfolio${prev.slug}/`}
              className="flex items-center  md:text-[1.375rem] text-lg mx-10 text-grey font-gorditamedium hover:text-primary transition-all"
            >
              <GreyArrow className="mr-3 rotate-180" />
              View Previous
            </Link>
          )}
          {next && (
            <Link
              to={`/portfolio${next.slug}/`}
              className="flex items-center md:text-[1.375rem] text-lg mx-10 text-grey font-gorditamedium hover:text-primary transition-all"
            >
              View Next
              <GreyArrow className="ml-3" />
            </Link>
          )}
        </div> */}
      </section>
    </>
  );
}
