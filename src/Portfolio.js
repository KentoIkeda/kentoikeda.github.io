import React, { useState, useEffect, useRef } from "react";
import { Github, Twitter, Mail, ExternalLink, Menu, X } from "lucide-react";

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // オープニングアニメーション
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // スクロールアニメーション用のカスタムフック
  const useScrollAnimation = () => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, []);

    return [ref, isVisible];
  };

  // プロフィール情報（ここを編集してください）
  const profile = {
    name: "池田 健人",
    nameEn: "KENTO IKEDA",
    title: "Full Stack Engineer",
    bio: "1996年9月14日生まれ。千葉県出身。\nフルリモート開発をメインに活動するフルスタックエンジニア。",
    image: "/images/20250829_131318603.JPG",
    email: "work@ikedakento.com",
    github: 'https://github.com/KentoIkeda',
  };

  const career = [
    {
      year: "2022 - 現在",
      title: "株式会社もばらぶ",
      role: "バックエンドエンジニア",
      description: "LaravelやCodeIgniterを用いたアプリケーションの設計・実装を担当。"
    },
    {
      year: "2019",
      title: "学校法人立志舎 東京IT会計法律専門学校千葉校 ITビジネス科 卒業",
      description: "情報処理コースを専攻。卒業研究では実務運用を想定した食品デリバリーに関するJavaアプリケーションのチーム開発に従事。"
    },
  ];

  const skills = [
    { category: "フロントエンド", items: ["React", "Vue.js", "jQuery", "Bootstrap", "Tailwind CSS"] },
    { category: "バックエンド", items: ["Node.js", "PHP", "Laravel", "CodeIgniter", "MySQL"] },
    { category: "その他", items: ["Git", "Docker", "AWS", "Figma", "Unity"] },
  ];

  const works = [
    {
      title: "美容師向け確定申告支援サービス",
      year: "2023 - 現在",
      description: "",
      tech: ["PHP", "CodeIgniter", "Sass", "MySQL", "JavaScript", "UI/UX Tuning"],
      link: "https://mobalab.net/works/accountech/",
      github: ""
    },
    {
      title: "選挙情報プラットフォーム",
      year: "2025",
      description: "",
      tech: ["PHP", "Laravel", "MySQL", "JavaScript", "JSON Data Management", "UI/UX Tuning"],
      link: "https://mobalab.net/works/senkyocom/",
      github: ""
    },
    {
      title: "障がい福祉サービス事業所検索サイト",
      year: "2022 - 2023",
      description: "",
      tech: ["PHP", "Laravel", "MySQL", "JavaScript", "UI/UX Tuning"],
      link: "https://mobalab.net/works/fukucie/",
      github: "",
    },
    {
      title: "百人一首の達人",
      year: "2014",
      description: "",
      tech: ["Visual Basic", "HTML5/CSS3"],
      link: "https://www.youtube.com/watch?v=dkZON4t2Iu4",
      github: "https://github.com/KentoIkeda/hyakuninissyunotatsujin",
    },
    {
      title: "THE INTERVIEW+",
      year: "2013",
      description: "",
      tech: ["Visual Basic", "HTML5/CSS3"],
      link: "",
      github: "https://github.com/KentoIkeda/the_interview_plus",
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // オープニングアニメーション画面
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1
            className="text-5xl md:text-7xl font-normal tracking-widest mb-4"
            style={{
              fontFamily: "'Noto Serif JP', serif",
              animation: "fadeInUp 1s ease-out"
            }}
          >
            {profile.nameEn}
          </h1>
          <div
            className="w-32 h-px bg-black mx-auto"
            style={{ animation: "expandWidth 1s ease-out 0.5s both" }}
          />
        </div>
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes expandWidth {
            from {
              width: 0;
            }
            to {
              width: 8rem;
            }
          }
        `}</style>
      </div>
    );
  }

  // セクションコンポーネント
  const AnimatedSection = ({ children, id, className = "" }) => {
    const [ref, isVisible] = useScrollAnimation();
    return (
      <section
        id={id}
        ref={ref}
        className={`${className} transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
      >
        {children}
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Noto Serif JP', 'Yu Mincho', 'YuMincho', serif" }}>
      {/* ナビゲーション */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => scrollToSection("top")}
              className="text-xl font-normal tracking-widest hover:opacity-60 transition-opacity"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              {profile.nameEn}
            </button>

            {/* デスクトップメニュー */}
            <div className="hidden md:flex gap-8 text-sm tracking-wider">
              <button onClick={() => scrollToSection("about")} className="hover:opacity-60 transition-opacity">
                ABOUT
              </button>
              <button onClick={() => scrollToSection("skills")} className="hover:opacity-60 transition-opacity">
                SKILLS
              </button>
              <button onClick={() => scrollToSection("works")} className="hover:opacity-60 transition-opacity">
                WORKS
              </button>
              <button onClick={() => scrollToSection("contact")} className="hover:opacity-60 transition-opacity">
                CONTACT
              </button>
            </div>

            {/* モバイルメニューボタン */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="flex flex-col py-4 px-6 gap-4 tracking-wider">
              <button onClick={() => scrollToSection("about")} className="text-left hover:opacity-60 transition-opacity">
                ABOUT
              </button>
              <button onClick={() => scrollToSection("skills")} className="text-left hover:opacity-60 transition-opacity">
                SKILLS
              </button>
              <button onClick={() => scrollToSection("works")} className="text-left hover:opacity-60 transition-opacity">
                WORKS
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-left hover:opacity-60 transition-opacity">
                CONTACT
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ヒーローセクション */}
      <section id="top" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl w-full animate-fade-in-slow">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-normal mb-6 tracking-tight leading-tight">
                {profile.name}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light mb-8 tracking-wide">
                {profile.title}
              </p>
              <div className="flex gap-6">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-gray-200">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUTセクション */}
      <AnimatedSection id="about" className="py-32 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-normal mb-16 text-gray-900 tracking-wide">
            ABOUT
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 font-light whitespace-pre-line mb-20">
            {profile.bio}
          </p>

          {/* 経歴タイムライン */}
          <div className="relative">
            {/* 縦線 */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" />

            <div className="space-y-12">
              {career.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-8"
                >
                  {/* ドット */}
                  <div className="absolute left-0 top-0 w-4 h-4 bg-black rounded-full border-4 border-white shadow-sm transform -translate-x-1/2" />

                  {/* 年 */}
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-900 tracking-wider">
                      {item.year}
                    </span>
                  </div>

                  {/* 内容 */}
                  <div>
                    <h3 className="text-xl font-medium mb-2">
                      {item.title}
                    </h3>
                    {item.role && (
                      <p className="text-sm text-gray-600 mb-3 font-light">
                        {item.role}
                      </p>
                    )}
                    <p className="text-gray-700 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* SKILLSセクション */}
      <AnimatedSection id="skills" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-normal mb-16 text-gray-900 tracking-wide">
            SKILLS
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {skills.map((skillGroup, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium mb-6 pb-3 border-b border-gray-200">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-3">
                  {skillGroup.items.map((skill, i) => (
                    <li key={i} className="text-gray-700 font-light">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* WORKSセクション */}
      <AnimatedSection id="works" className="py-32 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-normal mb-16 text-gray-900 tracking-wide">
            WORKS
          </h2>
          <div className="space-y-24">
            {works.map((work, index) => (
              <div key={index} className="border-t border-gray-200 pt-12">
                <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
                  <h3 className="text-3xl md:text-4xl font-normal">
                    {work.title}
                  </h3>
                  <span className="text-gray-500 font-light">
                    {work.year}
                  </span>
                </div>

                <p className="text-lg text-gray-700 font-light mb-6 leading-relaxed">
                  {work.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {work.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-white border border-gray-200 text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6">
                  {work.link && (
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm border-b border-black hover:opacity-60 transition-opacity pb-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      サイトを見る
                    </a>
                  )}
                  {work.github && (
                    <a
                      href={work.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm border-b border-black hover:opacity-60 transition-opacity pb-1"
                    >
                      <Github className="w-4 h-4" />
                      コードを見る
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CONTACTセクション */}
      <AnimatedSection id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-normal mb-16 text-gray-900 tracking-wide">
            CONTACT
          </h2>
          <p className="text-2xl md:text-3xl font-light mb-12 text-gray-700">
            お仕事のご依頼・ご相談は<br className="md:hidden" />お気軽にご連絡ください
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="inline-block text-xl md:text-2xl border-b-2 border-black hover:opacity-60 transition-opacity pb-2"
          >
            {profile.email}
          </a>
          <div className="flex justify-center gap-8 mt-12">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <Github className="w-7 h-7" />
            </a>
            <a
              href={profile.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <Twitter className="w-7 h-7" />
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* フッター */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-400 font-light tracking-wide">
            © {new Date().getFullYear()} {profile.name}. All Rights Reserved.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in-slow {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 1.5s ease-out;
        }
      `}</style>
    </div>
  );
}