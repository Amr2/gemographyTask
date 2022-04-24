import Image from "next/image";
import Link from "next/link";
import React from "react";
import pageStyles from "./index.module.scss";
const RepoCard = ({ data }, ref) => {
  const {
    owner: { avatar_url: avater, login, html_url: ownerUrl },
    name,
    html_url,
    description,
    stargazers_count,
    created_at,
    open_issues_count,
  } = data;

  return (
    <div className={pageStyles.repoCard} ref={ref}>
      <div className={pageStyles.avaterContainer}>
        <Image src={avater} alt="Repo Owner`s Avater" layout="fill" />
      </div>
      <div className={pageStyles.repoInfo}>
        <div className={pageStyles.repoName}>
          <h3>{name}</h3>
          <Link href={ownerUrl} passHref>
            <a target={"_blank"}>@{login}</a>
          </Link>
        </div>
        <div className={pageStyles.repoDescription}>
          <p>
            {description}
            {html_url && (
              <Link href={html_url} passHref>
                <a target={"_blank"}>go to repo now</a>
              </Link>
            )}
          </p>
        </div>
        <div className={pageStyles.repoStats}>
          <div className={`${pageStyles.repoStatsItem} ${pageStyles.star}`}>
            <svg
              width="24"
              height="24"
              viewBox="0 -32 576 576"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M259.3 17.8 194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
            <p>
              star : <span>{stargazers_count}</span>
            </p>
          </div>
          <div className={`${pageStyles.repoStatsItem} ${pageStyles.issue}`}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0zM12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm0 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
              />
            </svg>
            <p>
              issue : <span>{open_issues_count}</span>
            </p>
          </div>
          <div className={pageStyles.repoDate}>
            {new Date(created_at).toUTCString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(RepoCard);
