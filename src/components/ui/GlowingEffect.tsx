"use client";

import { Box,ExternalLink, Github, Mails, Swords, FolderKanban, Expand,} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { LinkPreview } from "@/components/ui/link-preview";

// const projects = [
//     {
//       title: "CrowdSourced",
//       description: "A decentralized platform for sharing and monetizing user-generated content.",
//       technologies: ["React", "Node.js", "MongoDB", "Blockchain", "AWS"],
//       image: "https://media.licdn.com/dms/image/v2/D5622AQGkUQ90GCFy2g/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1727068857774?e=1750896000&v=beta&t=dYmWbWEvu47Hv658TUbHvEGrx0mtY3Jw1CO71PyUFMs",
//       github: "https://github.com/tushar21014/Crowdsourced",
//       demo: "#",
//     },
//     {
//       title: "CodeArena",
//       description: "1v1 friendly coding battles solving DSA questions in real-time.",
//       technologies: ["Node", "WebSockets", "MongoDB", "Express"],
//       image: "/placeholder.svg?height=200&width=350",
//       github: "#",
//       demo: "#",
//     },
//     {
//       title: "AI Email Scheduler",
//       description: "Automates bulk emails scheduling with different formats and attachments.",
//       technologies: ["React", "Node", "AWS", "Gmail API"],
//       image: "https://private-user-images.githubusercontent.com/62438087/445764811-a023ab3d-35e3-4733-bdc2-bbbb4087960d.png",
//       github: "https://github.com/tushar21014/mailingsystem",
//       demo: "https://www.linkedin.com/posts/tushar-gupta-5666ba23b_react-nodejs-express-activity-7219200218557239297-YeTo?utm_source=share&utm_medium=member_desktop&rcm=ACoAADu5-Z4BgrjcE9I7wmIiHUJjNzrJf7GAjHM",
//     },
//   ];
export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="CrowdSourced"
        description="A decentralized platform for sharing and monetizing user-generated content."
        github= "https://github.com/tushar21014/Crowdsourced"
        demo = "https://www.linkedin.com/posts/tushar-gupta-5666ba23b_polygon-eth-crypto-activity-7243852247481122817-iPCW?utm_source=share&utm_medium=member_desktop&rcm=ACoAADu5-Z4BgrjcE9I7wmIiHUJjNzrJf7GAjHM"
        
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Mails className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="AI Email Scheduler"
        description="Automates bulk emails scheduling with different formats and attachments."
        github= "https://github.com/tushar21014/mailingsystem"
        demo="https://www.linkedin.com/posts/tushar-gupta-5666ba23b_react-nodejs-express-activity-7219200218557239297-YeTo?utm_source=share&utm_medium=member_desktop&rcm=ACoAADu5-Z4BgrjcE9I7wmIiHUJjNzrJf7GAjHM"

      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Swords className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="CodeArena"
        description="1v1 friendly coding battles solving DSA questions in real-time. With multiple modes like Speed Mode, Blind Mode & Efficiency Mode."
        github= "https://github.com/tushar21014/Codearena"

      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<FolderKanban className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="TaskSwift"
        description="Architected a dynamic scale-out solution for parallel resource deployment and concurrent request distribution, improving system performance."
        github= "https://github.com/tushar21014/TaskSwift"
        demo = "https://www.linkedin.com/posts/tushar-gupta-5666ba23b_taskswift-taskmanagement-mernstack-activity-7222096840169508864-6LkL?utm_source=share&utm_medium=member_desktop&rcm=ACoAADu5-Z4BgrjcE9I7wmIiHUJjNzrJf7GAjHM"
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Expand className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Spring boot API"
        description="Created a bunch of REST APIs using Spring Boot and Java for a project. The APIs were designed to be efficient, scalable, and easy to use."
        github= "https://github.com/tushar21014/SpringBoot-API"

      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  github?: string;
  demo?: string;
}

const GridItem = ({ area, icon, title, description, github, demo }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area} z-10`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">{icon}</div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>

              {/* GitHub & Demo links */}
              {(github || demo) && (
                <div className="flex gap-4 pt-2">
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      <LinkPreview url={github}>
                      <Github color="white" size={20}/>
                      </LinkPreview>
                    </a>
                  )}
                  {demo && (
                    <a
                      href={demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-green-600 hover:underline"
                    >
                                            <LinkPreview url={demo}>
                      <ExternalLink color="white" size={20}/>
                      </LinkPreview>

                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
