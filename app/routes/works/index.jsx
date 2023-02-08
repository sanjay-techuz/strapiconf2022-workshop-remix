import { Link, useLoaderData } from "remix";
import { checkStatus, checkEnvVars } from "~/utils/errorHandling";

export async function loader() {
  checkEnvVars();

  const res = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/work1s?populate=*`,
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
  console.log(data);
  // Did Strapi return an error object in its response?
  if (data.error) {
    console.log("Error", data.error);
    throw new Response("Error getting data from Strapi", { status: 500 });
  }

  return data.data;
}

export default function Works() {
  const works = useLoaderData();
  console.log(works);
  return (
    <section className="support-sec md:pt-8 py-14 pb-0 relative">
      <div className="container">
        <div className="w-full title-sec">
          <h2 className="md:text-3xl text-2xl md:pb-1 pb-10 font-blancotrialbold md:leading-[3rem] leading-[2rem] md:text-center text-center">
            Our Work
            <span className="inline-block w-2 h-2 ml-1 rounded-full bg-orangecol"></span>
          </h2>
        </div>
        {works.map((work, idx) => (
          <div
            key={idx}
            className="flex flex-wrap justify-between md:flex-nowrap md:py-24 py-12"
          >
            <div className="lg:max-w-[calc(40.66%-0.938rem)] md:max-w-[calc(40%-0.938rem)] lg:px-0 px-6 md:mb-0 mb-10 w-full rounded-[1.25rem] flex flex-col">
              <h3 className="text-[1.375rem] pb-5 font-blancotrialextrabold leading-[2rem]">
                {work.attributes.title}
                <span className="inline-block w-1 h-1 ml-1 rounded-full bg-orangecol" />
              </h3>
              <div className="flex flex-wrap items-center justify-between md:flex-nowrap pb-8">
                <div className="max-w-full w-full flex items-center flex-wrap">
                  <h3 className="text-2xl md:text-[34px] font-blancotrialbold">
                    {work.attributes.subTitle}
                  </h3>
                  <p className="text-base leading-[1.7rem] text-grey block py-9 max-w-[90%]">
                    {work.attributes.description}
                  </p>
                  <Link
                    to={work.attributes.title}
                    className="text-primary text-base font-gorditabold flex items-center group"
                  >
                    Project Details
                    <img
                      className="ml-3 transition-all animate-[linear] group-hover:ml-4"
                      src={"/assets/images/arrow.inline.svg"}
                      alt="inline"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:max-w-[calc(59.33%-0.938rem)] md:max-w-[calc(60%-0.938rem)] w-full rounded-[1.25rem] flex flex-col justify-center items-center">
              <img
                src={work.attributes.featuredImage.data.attributes.url}
                alt={`Techuz portfolio ${work.attributes.title}`}
                className="m-auto rounded-lg md:rounded-none"
              />
            </div>
          </div>
        ))}
      </div>
    </section>

    // <ul>
    //   {works.map((work) => (
    //     <li key={work.attributes.id}>
    //     <hgroup>
    //     <h2>{work.attributes.title}</h2>
    //     <h3>{work.attributes.heading}</h3>
    //   </hgroup>

    //   <p>
    //     {work.attributes.description}
    //   </p>
    //   <img
    //     src={"http://localhost:1337"+ work.attributes.front_image.data.attributes.url}
    //     alt={work.attributes.title + ' image'}
    //     />
    //       <Link to={work.attributes.title}>Project Details{`>`}</Link>
    //     </li>
    //   ))}
    // </ul>
  );
}
