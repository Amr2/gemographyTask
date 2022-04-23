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
    language,
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
          <div className={pageStyles.repoStatsItem}>
            star : <span>{stargazers_count}</span>
          </div>
          <div className={pageStyles.repoStatsItem}>
            iusse : <span>{open_issues_count}</span>
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
