import { useEffect, useState, type ReactNode } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import profileImg from './assets/hero.png'

type Tech = {
  title: string
  subtitle: string
  icon: ReactNode
}

type Project = {
  title: string
  description: string
  tags: string[]
  href: string
}

type GithubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  topics?: string[]
  fork: boolean
  archived: boolean
  updated_at: string
}

function Icon({
  children,
}: {
  children: ReactNode
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-violet-300"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  const githubUsername = 'mevzin'
  const githubProjectsLimitRaw = Number(
    import.meta.env.VITE_GITHUB_PROJECTS_LIMIT ?? '6',
  )
  const githubProjectsLimit = Number.isFinite(githubProjectsLimitRaw)
    ? Math.max(1, Math.min(12, githubProjectsLimitRaw))
    : 6
  const isGithubConfigured = true

  const [githubProjects, setGithubProjects] = useState<Project[] | null>(null)
  const [githubLoading, setGithubLoading] = useState(false)
  const [githubError, setGithubError] = useState<string | null>(null)

  const technologies: Tech[] = [
    {
      title: 'JavaScript',
      subtitle: 'ES6+',
      icon: (
        <Icon>
          <path
            d="M7.5 4.5h9v15h-9v-15Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M9.25 16.25c.4.5.95.75 1.65.75 1 0 1.6-.55 1.6-1.55V10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M13.8 15.8c.35.7.95 1.2 1.9 1.2 1 0 1.55-.5 1.55-1.2 0-.85-.65-1.15-1.75-1.6l-.6-.25c-1.1-.45-1.85-1.05-1.85-2.3 0-1.15.9-2.05 2.3-2.05 1 0 1.7.35 2.2 1.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </Icon>
      ),
    },
    {
      title: 'TypeScript',
      subtitle: 'Tipagem',
      icon: (
        <Icon>
          <path
            d="M7.5 4.5h9v15h-9v-15Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M9.2 10h5.6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 10v7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M14.1 16.7c.35.55.9.8 1.7.8.95 0 1.5-.45 1.5-1.1 0-.8-.6-1.05-1.55-1.45l-.55-.25c-1.05-.45-1.75-1-1.75-2.2 0-1.1.85-1.95 2.2-1.95.95 0 1.6.3 2.05 1.05"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </Icon>
      ),
    },
    {
      title: 'React',
      subtitle: 'UI',
      icon: (
        <Icon>
          <path
            d="M12 12.25a.25.25 0 1 0 0-.5.25.25 0 0 0 0 .5Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 7c3.6 0 6.5 2.3 6.5 5s-2.9 5-6.5 5-6.5-2.3-6.5-5 2.9-5 6.5-5Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8.2 8.6c1.8-3.1 4.8-4.6 6.9-3.4 2.1 1.2 2.5 4.7.7 7.8-1.8 3.1-4.8 4.6-6.9 3.4-2.1-1.2-2.5-4.7-.7-7.8Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8.2 15.4c-1.8-3.1-1.4-6.6.7-7.8 2.1-1.2 5.1.3 6.9 3.4 1.8 3.1 1.4 6.6-.7 7.8-2.1 1.2-5.1-.3-6.9-3.4Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </Icon>
      ),
    },
    {
      title: 'Node.js',
      subtitle: 'Back-end',
      icon: (
        <Icon>
          <path
            d="M12 3.5 19.5 8v8L12 20.5 4.5 16V8L12 3.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M9 10v4c0 1 1.2 1.8 3 1.8s3-.8 3-1.8v-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </Icon>
      ),
    },
    {
      title: 'MongoDB',
      subtitle: 'NoSQL',
      icon: (
        <Icon>
          <path
            d="M12 3c2.6 2.5 4.2 5.2 4.2 8 0 3.8-2 7-4.2 10-2.2-3-4.2-6.2-4.2-10 0-2.8 1.6-5.5 4.2-8Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 6v15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </Icon>
      ),
    },
    {
      title: 'MySQL',
      subtitle: 'SQL',
      icon: (
        <Icon>
          <path
            d="M6 7c0-2 2.7-3.5 6-3.5S18 5 18 7s-2.7 3.5-6 3.5S6 9 6 7Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M6 7v10c0 2 2.7 3.5 6 3.5s6-1.5 6-3.5V7"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M6 12c0 2 2.7 3.5 6 3.5s6-1.5 6-3.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </Icon>
      ),
    },
    {
      title: 'Docker',
      subtitle: 'DevOps',
      icon: (
        <Icon>
          <path
            d="M5 12h14v3.5c0 2-1.6 3.5-3.5 3.5H10c-2.8 0-5-2.2-5-5v-2Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8 12V9.5h2V12H8Zm3 0V9.5h2V12h-2Zm3 0V9.5h2V12h-2Z"
            fill="currentColor"
            opacity="0.75"
          />
          <path
            d="M19.2 12.5c.8-.2 1.4-.8 1.6-1.6.2-.9-.1-1.8-.8-2.4-.6-.5-1.5-.6-2.2-.2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </Icon>
      ),
    },
    {
      title: 'Angular',
      subtitle: 'Framework',
      icon: (
        <Icon>
          <path
            d="M12 3 19.2 6.2 18 16.8 12 21 6 16.8 4.8 6.2 12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 6.8 16.1 16.2h-2.1l-.8-2H10.8l-.8 2H7.9L12 6.8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M11.3 12.8h1.4L12 11.1l-.7 1.7Z"
            fill="currentColor"
            opacity="0.75"
          />
        </Icon>
      ),
    },
  ]

  useEffect(() => {
    if (!isGithubConfigured) return

    let active = true

    async function load() {
      try {
        if (active) {
          setGithubLoading(true)
          setGithubError(null)
        }

        const path = `/users/${encodeURIComponent(githubUsername)}/repos?per_page=100&sort=updated`
        const headers = {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        }

        const url = import.meta.env.DEV
          ? `/github${path}`
          : `https://api.github.com${path}`

        const response = await fetch(url, { headers })

        if (!response.ok) {
          const remaining = response.headers.get('x-ratelimit-remaining')
          if (response.status === 403 && remaining === '0') {
            throw new Error('RATE_LIMIT')
          }
          if (response.status === 404) {
            throw new Error('NOT_FOUND')
          }
          throw new Error(`GitHub API: ${response.status}`)
        }

        const data = (await response.json()) as GithubRepo[]

        const mapped = data
          .filter((repo) => !repo.fork && !repo.archived)
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
          )
          .slice(0, githubProjectsLimit)
          .map<Project>((repo) => {
            const tags = [
              repo.language ?? undefined,
              ...(repo.topics ?? []),
            ].filter(Boolean) as string[]

            return {
              title: repo.name,
              description: repo.description ?? 'Sem descrição.',
              tags: tags.slice(0, 4),
              href: repo.html_url,
            }
          })

        if (active) setGithubProjects(mapped)
      } catch (err) {
        if (!active) return
        if (err instanceof Error && err.message === 'NOT_FOUND') {
          setGithubError('Usuário não encontrado no GitHub.')
        } else if (err instanceof Error && err.message === 'RATE_LIMIT') {
          setGithubError(
            'Limite de requisições do GitHub atingido. Tente mais tarde.',
          )
        } else {
          setGithubError('Não foi possível carregar seus repositórios agora.')
        }
        setGithubProjects([])
      } finally {
        if (active) setGithubLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [githubProjectsLimit, githubUsername, isGithubConfigured])

  const projects = githubProjects ?? []

  const sectionVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  }

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-violet-500"
      />

      <div className="mx-auto min-h-screen w-full max-w-5xl border-x border-transparent">
        <header className="sticky top-0 z-40 border-b border-transparent bg-neutral-950/70 backdrop-blur">
          <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
            <a
              href="#topo"
              className="text-sm font-semibold tracking-wide text-neutral-100"
            >
              TT Dev
            </a>
            <div className="flex items-center gap-2">
              {[
                { label: 'Sobre', href: '#sobre' },
                { label: 'Techs', href: '#techs' },
                { label: 'Projetos', href: '#projetos' },
                { label: 'Contato', href: '#contato' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-transparent bg-neutral-900/40 px-3 py-1 text-xs text-neutral-200 transition hover:border-transparent hover:bg-neutral-900"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </header>

        <main id="topo" className="px-4">
          <section className="py-16">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-left"
              >
                <p className="text-sm font-medium text-violet-300">
                  Desenvolvedor Full Stack
                </p>
                <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-neutral-50 md:text-5xl">
                  Thiago Torres
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 md:text-base">
                  Criação de aplicações completas, do front-end ao back-end, com
                  foco em performance e escalabilidade.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#projetos"
                    className="inline-flex items-center justify-center rounded-md bg-violet-500 px-5 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-violet-400"
                  >
                    Ver Projetos
                  </a>
                  <a
                    href="#contato"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-neutral-900/40 px-5 py-2 text-sm font-semibold text-neutral-100 transition hover:border-transparent hover:bg-neutral-900"
                  >
                    Contato
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
                className="flex justify-center md:justify-end"
              >
                <div className="relative">
                  <div className="absolute -inset-6 rounded-full bg-violet-500/10 blur-2xl" />
                  <div className="relative h-56 w-56 overflow-hidden rounded-full border border-transparent bg-neutral-900/40">
                    <img
                      src={profileImg}
                      alt="Foto de perfil"
                      className="h-full w-full object-cover object-center"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <motion.section
            id="sobre"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="py-16 text-center"
          >
            <h2 className="text-lg font-semibold text-neutral-50">Sobre mim</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
              Sou desenvolvedor Full Stack especializado em Node.js, TypeScript e MongoDB, com foco na criação de sistemas sob medida, APIs e automações.
              Já desenvolvi bots para Discord, sistemas integrados com banco de dados e soluções voltadas para servidores RP, sempre priorizando eficiência, organização e entrega funcional.
              Meu objetivo é ajudar clientes a transformar ideias em soluções reais, com sistemas estáveis, escaláveis e prontos para uso.
            </p>
          </motion.section>

          <motion.section
            id="techs"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="py-16"
          >
            <h2 className="text-center text-lg font-semibold text-neutral-50">
              Tecnologias
            </h2>
            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {technologies.map((tech) => (
                <motion.div
                  key={tech.title}
                  variants={cardVariants}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="rounded-lg border border-transparent bg-neutral-900/30 p-4 text-left shadow-[0_0_0_1px_rgba(0,0,0,0.0)] transition hover:border-transparent hover:bg-neutral-900/45"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent bg-neutral-950">
                      {tech.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-100">
                        {tech.title}
                      </p>
                      <p className="text-xs text-neutral-400">{tech.subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section
            id="projetos"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="py-16"
          >
            <h2 className="text-center text-lg font-semibold text-neutral-50">
              Projetos
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-neutral-400">
              {githubLoading
                ? 'Carregando repositórios...'
                : githubError
                  ? githubError
                  : projects.length === 0
                    ? 'Nenhum repositório público encontrado.'
                    : `Repositórios públicos de @${githubUsername}`}
            </p>
            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid gap-4 lg:grid-cols-3"
            >
              {projects.map((project) => (
                <motion.a
                  key={project.title}
                  variants={cardVariants}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  href={project.href}
                  className="group rounded-lg border border-transparent bg-neutral-900/30 p-5 text-left transition hover:border-transparent hover:bg-neutral-900/45"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-neutral-100">
                      {project.title}
                    </p>
                    <span className="text-xs text-neutral-400 transition group-hover:text-neutral-300">
                      Ver
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-transparent bg-neutral-950/40 px-2.5 py-1 text-[11px] text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.section>

          <motion.section
            id="contato"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="py-16"
          >
            <h2 className="text-center text-lg font-semibold text-neutral-50">
              Contato
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-neutral-300 md:text-base">
              Estou em constante evolução e aberto a novas oportunidades de
              colaboração.
            </p>

            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid gap-4 md:grid-cols-3"
            >
              {[
                {
                  title: 'Email',
                  subtitle: 'thiagomev@gmail.com',
                  href: 'mailto:thiagomev@gmail.com',
                  icon: (
                    <Icon>
                      <path
                        d="M4.5 7.5h15v9h-15v-9Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M4.5 8l7.5 5 7.5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Icon>
                  ),
                },
                {
                  title: 'GitHub',
                  subtitle: 'github.com/mevzin',
                  href: 'https://github.com/mevzin',
                  icon: (
                    <Icon>
                      <path
                        d="M12 3.75c-4.55 0-8.25 3.7-8.25 8.25 0 3.64 2.37 6.73 5.66 7.82.41.07.56-.18.56-.4v-1.4c-2.3.5-2.78-1.1-2.78-1.1-.38-.96-.94-1.22-.94-1.22-.77-.53.06-.52.06-.52.85.06 1.3.87 1.3.87.75 1.28 1.96.91 2.44.7.07-.55.29-.91.53-1.12-1.84-.21-3.78-.92-3.78-4.09 0-.9.32-1.64.85-2.22-.09-.21-.37-1.06.08-2.2 0 0 .69-.22 2.26.85.66-.18 1.36-.27 2.06-.27.7 0 1.4.09 2.06.27 1.57-1.07 2.26-.85 2.26-.85.45 1.14.17 1.99.08 2.2.53.58.85 1.32.85 2.22 0 3.18-1.95 3.88-3.8 4.08.3.26.56.77.56 1.56v2.32c0 .22.15.47.57.39A8.27 8.27 0 0 0 20.25 12c0-4.55-3.7-8.25-8.25-8.25Z"
                        fill="currentColor"
                      />
                    </Icon>
                  ),
                },
                {
                  title: 'LinkedIn',
                  subtitle: 'linkedin.com/in/thiagotorresmev/',
                  href: 'https://www.linkedin.com/in/thiagotorresmev/',
                  icon: (
                    <Icon>
                      <path
                        d="M6.5 9.5H9v10H6.5v-10Z"
                        fill="currentColor"
                      />
                      <path
                        d="M7.75 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
                        fill="currentColor"
                      />
                      <path
                        d="M11 9.5h2.4v1.4c.35-.8 1.3-1.6 2.75-1.6 2.55 0 3.35 1.55 3.35 4.05v6.15H17v-5.55c0-1.6-.3-2.55-1.55-2.55-1.1 0-1.85.75-1.85 2.55v5.55H11v-10Z"
                        fill="currentColor"
                      />
                    </Icon>
                  ),
                },
              ].map((item) => (
                <motion.a
                  key={item.title}
                  variants={cardVariants}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    item.href.startsWith('http')
                      ? 'noreferrer noopener'
                      : undefined
                  }
                  className="rounded-lg border border-transparent bg-neutral-900/30 p-5 text-left transition hover:border-transparent hover:bg-neutral-900/45"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent bg-neutral-950">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-100">
                        {item.title}
                      </p>
                      <p className="text-xs text-neutral-400">{item.subtitle}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.section>

          <footer className="py-10 text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} TT Dev · Full Stack Developer
          </footer>
        </main>
      </div>
    </div>
  )
}

export default App
