import React, { useState, useRef, useEffect } from 'react';

interface Channel {
  name: string;
  url: string;
  period: string;
  role: string;
}

interface Video {
  title: string;
  url: string;
  channel: string;
  caption?: string;
  hashtags?: string;
  music?: string;
}

const TikTokPortfolio: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    if (!scrollContainerRef.current || isAutoScrollPaused) return;

    const scrollContainer = scrollContainerRef.current;
    let animationFrameId: number;
    let startTime: number;
    const scrollDuration = 30000; // 30 seconds for one complete scroll
    const pixelsPerSecond = 100; // Fixed scroll speed in pixels per second

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Calculate scroll position based on fixed speed
      const scrollPosition = (elapsed * pixelsPerSecond) / 1000;
      
      // Reset when reaching the middle
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        startTime = timestamp;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = scrollPosition;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAutoScrollPaused]);

  useEffect(() => {
    // Load TikTok embed script
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Extract video ID from TikTok URL
  const getVideoId = (url: string) => {
    const match = url.match(/video\/(\d+)/);
    return match ? match[1] : '';
  };

  // Get username from URL
  const getUsername = (url: string) => {
    const match = url.match(/@([^/]+)/);
    return match ? match[1] : '';
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 300; // Adjust scroll amount as needed
    const container = scrollContainerRef.current;
    const newScrollPosition = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  };

  const channels: Channel[] = [
    {
      name: "แก้วมังกรที่ไม่ใช่ผลไม้",
      url: "https://www.tiktok.com/@keawmangkorn",
      period: "Jan 2024 - Current",
      role: "Main Editor"
    },
    {
      name: "แก้วมังกร คนโปรดของจักรวาล",
      url: "https://www.tiktok.com/@keawmangkorn.83",
      period: "Jan 2024 - Feb 2024",
      role: "Editor, Graphic Design"
    },
    {
      name: "Doris Thailand",
      url: "https://www.tiktok.com/@doris.thailand",
      period: "Nov 2024 - Current",
      role: "Editor"
    },
    {
      name: "E&P AUDIO",
      url: "https://www.tiktok.com/@easyandperfectaudio",
      period: "Jan 2024 - Current",
      role: "Editor"
    },
    {
      name: "Lonzuer Premium",
      url: "https://www.tiktok.com/@lonzuerpremium",
      period: "Jan 2024 - Dec 2024",
      role: "Editor"
    },
    {
      name: "Pangboyz (แป้งบอยเอง)",
      url: "https://www.tiktok.com/@pangboyz",
      period: "July 2024 - Current",
      role: "Camera man"
    }
  ];

  const videos: Video[] = [
    // แก้วมังกร Channel
    {
      title: "งานเลี้ยงบริษัท",
      url: "https://www.tiktok.com/@keawmangkorn/video/7484208719530708225",
      channel: "แก้วมังกร",
      caption: "ปาร์ตี้บริษัท ชุดแฟนซี มาดูกัน ใครแต่งเป็นอะไร",
      hashtags: "#แก้วมังกร #แก้วมังกรที่ไม่ใช่ผลไม้ #แก้วมังกรสะใภ้จีน #easyandperfect #ใช้ดีมีความสุข #งานเลี้ยงบริษัท #พนักงานออฟฟิศ #ชุดแฟนซี",
      music: "เสียงต้นฉบับ - แก้วมังกร ที่ไม่ใช่ผลไม้"
    },
    {
      title: "คนในบริษัทกินท่าอะไรบ้าง",
      url: "https://www.tiktok.com/@keawmangkorn/video/7483817632483839248",
      channel: "แก้วมังกร",
      caption: "บริษัทนี้ กินแต่หมูกะทะ 555",
      hashtags: "#แก้วมังกร #แก้วมังกรที่ไม่ใช่ผลไม้ #แก้วมังกรสะใภ้จีน #easyandperfect #ใช้ดีมีความสุข #งานเลี้ยงบริษัท #พนักงานออฟฟิศ",
      music: "เสียงต้นฉบับ - แก้วมังกร ที่ไม่ใช่ผลไม้"
    },
    {
      title: "กิจกรรมท่องเที่ยวบริษัท",
      url: "https://www.tiktok.com/@keawmangkorn/video/7484516269224398097",
      channel: "แก้วมังกร",
      caption: "ทีมสีชมพูเรามันเลิศ 💕",
      hashtags: "#แก้วมังกร #แก้วมังกรที่ไม่ใช่ผลไม้ #แก้วมังกรสะใภ้จีน #easyandperfect #ใช้ดีมีความสุข #งานเลี้ยงบริษัท #พนักงานออฟฟิศ #เขาใหญ่",
      music: "เสียงต้นฉบับ - แก้วมังกร ที่ไม่ใช่ผลไม้"
    },
    {
      title: "เทคนิคการทำ Tiktok",
      url: "https://www.tiktok.com/@keawmangkorn/video/7481878776536665360",
      channel: "แก้วมังกร",
      caption: "ทำไปเหอะ ถึงแม้ช่วงนี้ คลิปจะไม่ขึ้นฟิต",
      hashtags: "#แก้วมังกร #แก้วมังกรที่ไม่ใช่ผลไม้ #แก้วมังกรสะใภ้จีน #tiktok",
      music: "เสียงต้นฉบับ - แก้วมังกร ที่ไม่ใช่ผลไม้"
    },
    {
      title: "รีวิวโทรศัพท์คิตตี้",
      url: "https://www.tiktok.com/@keawmangkorn/video/7481458600750189825",
      channel: "แก้วมังกร",
      caption: "รีวิว โทรศัพท์ของสาวหวานอย่างเรา",
      hashtags: "#แก้วมังกร #แก้วมังกรที่ไม่ใช่ผลไม้ #แก้วมังกรสะใภ้จีน #โทรศัพท์ #โทรศัพท์มือถือ #hellokitty",
      music: "เสียงต้นฉบับ - แก้วมังกร ที่ไม่ใช่ผลไม้"
    },
    // E&P Audio Channel
    {
      title: "วิธีใช้งานลำโพง",
      url: "https://www.tiktok.com/@easyandperfectaudio/video/7452660308424019207",
      channel: "E&P AUDIO",
      caption: "ตอบกลับ @W_zhop วิธีชาร์จแบตลำโพง และ ไมค์ 4205 Plus ดูแล้วทำตามได้เลย!",
      hashtags: "#easyandperfectใช้ดีมีความสุข #easyandperfect #ลําโพง #แม่ค้าน่ารัก #ลําโพงบลูทูธไร้สาย #howto",
      music: "เสียงต้นฉบับ - E&P Audio"
    },
    {
      title: "ไลฟ์สดขายลำโพง",
      url: "https://www.tiktok.com/@easyandperfectaudio/video/7474172758625242423",
      channel: "E&P AUDIO",
      caption: "The sky เสียงดีจัดหนักจัดเต็ม",
      hashtags: "#easyandperfectใช้ดีมีความสุข #easyandperfect #ลําโพง #ลําโพงบลููธูทเสียงดี #ลําโพงบลทูธไร้สาย #ลําโพงปรับเบสได้",
      music: "เสียงต้นฉบับ - E&P Audio"
    },
    {
      title: "แนวประกอบดนตรี",
      url: "https://www.tiktok.com/@easyandperfectaudio/video/7466300077095587079",
      channel: "E&P AUDIO",
      caption: "กงยูหรือจะสู้กงเพชร🫦💎 อยากเท่บ้าง‼️ แต่เรามันก็คนตลกซะด้วย 🕺",
      hashtags: "#easyandperfectใช้ดีมีความสุข #easyandperfect #mrlover #squidgame #gongyoo",
      music: "เสียงต้นฉบับ - E&P Audio"
    },
    {
      title: "แนวสัมภาษณ์",
      url: "https://www.tiktok.com/@easyandperfectaudio/video/7449597960079396104",
      channel: "E&P AUDIO",
      caption: "แสนฟอลแตกแล้ว ✅ ขอขอบพระคุณลูกค้า 😭 Easy and Perfect และ แฟนคลับช่อง E&P Audio ทุกท่าน 🙏🏻✨ ขอฝากตัวทั้งในปีนี้และปีต่อ ๆ ไป ด้วยนะคะ รักชาวอีซี่ค่ะ🔥💕",
      hashtags: "#easyandperfectใช้ดีมีความสุข #easyandperfect #ลําโพง #qna #ถามตอบ #ขอบคุณทุกกําลังใจ❤️ขอบคุณทุกคอมเม้น🙏",
      music: "เสียงต้นฉบับ - E&P Audio"
    },
    {
      title: "แนวปั่นๆ",
      url: "https://www.tiktok.com/@easyandperfectaudio/video/7467812794117672210",
      channel: "E&P AUDIO",
      caption: "อยากให้ตัดต่อปรับอะไร ? Ep.2 🔥 พาพี่เพชรมาทำความฝันให้เป็นจริงกันเถอะ🤩‼️",
      hashtags: "#easyandperfectใช้ดีมีความสุข #easyandperfect #ตัดต่อ #ตลก #edit",
      music: "เสียงต้นฉบับ - E&P Audio"
    },
    {
      title: "วิธีการเคลมสินค้า",
      url: "https://www.tiktok.com/@easyandperfectaudio/video/7403200005940563208",
      channel: "E&P AUDIO",
      caption: "วิธีการติดต่อแอดมินและเคลมสินค้าในกรณีสินค้ามีปัญหาทำยังไงนะ🤔?",
      hashtags: "#easyandperfect #easyandperfectใช้ดีมีความสุข #lonzuer #fyp #howto",
      music: "เสียงต้นฉบับ - E&P Audio"
    },
    {
      title: "แนวละคร",
      url: "https://www.tiktok.com/@easyandperfectaudio/video/7346047066826689793",
      channel: "E&P AUDIO",
      caption: "ได้มั้ยคะสุดสวย 💕✨",
      hashtags: "#easyandperfect #easyandperfectใช้ดีมีความสุข #fypシ #เทรนด์วันนี้",
      music: "เสียงต้นฉบับ - E&P Audio"
    },
    {
      title: "แนวtext",
      url: "https://www.tiktok.com/@easyandperfectaudio/video/7408870238961274120",
      channel: "E&P AUDIO",
      caption: "วิธีขอเมียซื้อของ ฉบับพ่อบ้านใจกล้า 🥰🔥💦",
      hashtags: "#pov #easyandperfectใช้ดีมีความสุข #ลําโพงบลูทูธ #พ่อบ้านใจกล้า #ตลก #chat",
      music: "เสียงต้นฉบับ - E&P Audio"
    },
    // Easy and Perfect Official
    {
      title: "ถ่ายและตัดต่อ",
      url: "https://www.tiktok.com/@easyandperfect.official/video/7352037945978670353",
      channel: "Easy and Perfect Official",
      caption: "ถ่ายและตัดต่อ",
      hashtags: "#easyandperfect #easyandperfectใช้ดีมีความสุข",
      music: "เสียงต้นฉบับ - Easy and Perfect Official"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Channels Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6">EDITOR / CONTENT CREATOR</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((channel, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold mb-2">{channel.name}</h4>
              <p className="font-medium text-gray-700 mb-2">{channel.role}</p>
              <a 
                href={channel.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 break-all"
              >
                {channel.url}
              </a>
              <p className="text-gray-600 mt-2">{channel.period}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Videos Carousel */}
      <div className="relative group">
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-r-lg p-3 z-10 transition-opacity opacity-0 group-hover:opacity-100"
          onMouseEnter={() => setIsAutoScrollPaused(true)}
          onMouseLeave={() => setIsAutoScrollPaused(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 hide-scrollbar"
          onMouseEnter={() => setIsAutoScrollPaused(true)}
          onMouseLeave={() => {
            setIsAutoScrollPaused(false);
          }}
        >
          <div className="flex space-x-4" style={{ minWidth: 'min-content' }}>
            {/* Original videos */}
            {videos.map((video, index) => (
              <div 
                key={`original-${index}`}
                className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
                style={{ minWidth: '325px' }}
              >
                <div dangerouslySetInnerHTML={{ 
                  __html: `
                    <blockquote class="tiktok-embed" cite="${video.url}" data-video-id="${getVideoId(video.url)}" style="max-width: 605px;min-width: 325px;">
                      <section>
                        <a target="_blank" title="@${getUsername(video.url)}" href="https://www.tiktok.com/@${getUsername(video.url)}?refer=embed">@${getUsername(video.url)}</a>
                        ${video.caption || ''}
                        ${video.hashtags ? video.hashtags.split(' ').map(tag => `
                          <a title="${tag.substring(1)}" target="_blank" href="https://www.tiktok.com/tag/${encodeURIComponent(tag.substring(1))}?refer=embed">${tag}</a>
                        `).join(' ') : ''}
                        ${video.music ? `
                          <a target="_blank" title="♬ ${video.music}" href="https://www.tiktok.com/music/${encodeURIComponent(video.music)}?refer=embed">♬ ${video.music}</a>
                        ` : ''}
                      </section>
                    </blockquote>
                    <script async src="https://www.tiktok.com/embed.js"></script>
                  `
                }} />
                <div className="p-4">
                  <h4 className="font-semibold text-base mb-2 line-clamp-1">{video.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{video.channel}</p>
                </div>
              </div>
            ))}
            {/* Cloned videos */}
            {videos.map((video, index) => (
              <div 
                key={`clone-${index}`}
                className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
                style={{ minWidth: '325px' }}
              >
                <div dangerouslySetInnerHTML={{ 
                  __html: `
                    <blockquote class="tiktok-embed" cite="${video.url}" data-video-id="${getVideoId(video.url)}" style="max-width: 605px;min-width: 325px;">
                      <section>
                        <a target="_blank" title="@${getUsername(video.url)}" href="https://www.tiktok.com/@${getUsername(video.url)}?refer=embed">@${getUsername(video.url)}</a>
                        ${video.caption || ''}
                        ${video.hashtags ? video.hashtags.split(' ').map(tag => `
                          <a title="${tag.substring(1)}" target="_blank" href="https://www.tiktok.com/tag/${encodeURIComponent(tag.substring(1))}?refer=embed">${tag}</a>
                        `).join(' ') : ''}
                        ${video.music ? `
                          <a target="_blank" title="♬ ${video.music}" href="https://www.tiktok.com/music/${encodeURIComponent(video.music)}?refer=embed">♬ ${video.music}</a>
                        ` : ''}
                      </section>
                    </blockquote>
                    <script async src="https://www.tiktok.com/embed.js"></script>
                  `
                }} />
                <div className="p-4">
                  <h4 className="font-semibold text-base mb-2 line-clamp-1">{video.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{video.channel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-l-lg p-3 z-10 transition-opacity opacity-0 group-hover:opacity-100"
          onMouseEnter={() => setIsAutoScrollPaused(true)}
          onMouseLeave={() => setIsAutoScrollPaused(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TikTokPortfolio;