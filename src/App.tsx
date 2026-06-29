import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  User,
  Phone,
  Tag,
  Compass,
  DollarSign,
  MessageSquare,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Instagram,
  Mail,
  MessageCircle,
  Menu,
  Heart,
  Clock,
  ExternalLink
} from 'lucide-react';

// Static Data matching the premium brand story and image list
const SIGNATURE_SERVICES = [
  {
    id: 'proposal',
    title: 'Proposal Bouquet',
    subtitle: '프로포즈 부케',
    description: '영원한 약속의 순간을 위한 가장 고결하고 웅장한 디자인.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcmzWOtcJ1DmlWO5b6sllHkeRv_umS8dL7DvCs1zSfhIzdiTZckj0jX9f2YFGapFNSACiWmBEK6xICTO1lrbgxaxi5u7o5DzX53bPtSpcpxV5PhylMtNAX3oMsUXehZDJVRkK9i77fSb03v727cAiRyMojxok66_3zdIR7pOTBK58CZbPyoiz85ttcv0OV--Bw2ORUHIMjLPz2zWmUlxbaJzrudvguOMyu03-TEpsXv7aSq3WmH5ByqIEHs3UYjP4W0KIE0GLkWAY',
    tags: ['오키드', '가드니아', '시그니처', '화이트 무드'],
    priceRange: '20만원 대부터'
  },
  {
    id: 'anniversary',
    title: 'Anniversary Flower',
    subtitle: '기념일 플라워 박스',
    description: '함께한 시간의 깊이를 닮은 깊고 풍부한 색채의 꽃들.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtsW7T-9z6wzygaSOJFMxv1xH42v9FX-43s81s6-J7gFSNUvyD7z3FmTN29MLklrzYB_D6_865DBITwzrrUhb81Q7cIUWeaQdSW78Dh-LYeCQ_Pn2rXmneGZd9ZGk8vFUl9-tlVt4rH0MOK2yX-xYWFJidDTYHw9nFqTu4Rysun5DMPXnsFsUsv6bsQl3AZlIowZhPfpT91U-1ur7VbeZB0okl4XREWsGGlZKgmki_QE4ksO74Ht94Hs2FYJtb2Q8NYNbCI-IU0tI',
    tags: ['라넌큘러스', '스위트피', '로맨틱 레드', '플라워 박스'],
    priceRange: '15만원 대부터'
  },
  {
    id: 'message',
    title: 'Message Bouquet',
    subtitle: '메시지 컬렉션',
    description: '말보다 깊은 진심을 전하는 섬세하고 프라이빗한 꽃말 선물.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1OfVosKv_CuXVz1j-fC2bSdAz7ORAtJ9d4AqGGSN_-rQTM6DdoVKXrFSKdAUQZXLTIWaR3IvTP74F454dyXvZyZpARS4KSWppRNvhEPCfhAy8KLnEdBhVVvs7rTv0NmkeTitJ4hNfiyIkrkNeJKTbX_QRQQhWqzEXW5gtQHmUl4RXfHCMedK9fp5Tak1nxiNINJS3nh8jMTy3kR16HxPm-KyS76xfHNzlNS0kLNw3a5i0bgHyM_dOk3hxJkY5P6EAdnCpTopsX9c',
    tags: ['커스텀 레터링', '파스텔 톤', '프렌치 스타일', '감성 무드'],
    priceRange: '18만원 대부터'
  },
  {
    id: 'event',
    title: 'Brand & Event',
    subtitle: '공간 및 브랜드 연출',
    description: '브랜드의 철학과 공간의 무드를 완성하는 예술적 설치물.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4PTXg9YP3u7tNu57caFIuqBlAae5QLMNmvjDwtZS_Ndw4rqsLCuLqKQNWcQniAEqYgdp_FuhmwEU0HtR9TS6shiloUh0b4S_nZ_gqWorNE6mS9MVl7kh9XsLP7Svezifz_M_581QOpRxHwrJNNcEmIg_AhU30ZNijoILh8abgk6Da8yvcYEozSJ-b24FO3RYc0y8r6IWt51AJSJmvx85bWm0VH1XDEMe_-1wPfSrXcm_Dxn4jNv6CVgxRu4ZbbR-X7xCXdc4MOtE',
    tags: ['공간 연출', '오브제', '전시회', '럭셔리 비스포크'],
    priceRange: '별도 유선 상담'
  }
];

const THE_PROCESS = [
  {
    step: '01',
    title: 'Story',
    titleKo: '스토리 공유',
    desc: '상담을 통해 소중한 사람과의 이야기, 추억, 취향을 깊이 있게 나눕니다.'
  },
  {
    step: '02',
    title: 'Mood',
    titleKo: '컨셉 디자인',
    desc: '선물하시는 목적과 공간 분위기에 매칭되는 독창적인 컬러 팔레트와 디자인 무드를 확정합니다.'
  },
  {
    step: '03',
    title: 'Selection',
    titleKo: '꽃 선별',
    desc: '새벽 경매를 통해 엄선한 가장 신선하고 최상급 품질을 지닌 계절 꽃들만을 선별하여 정교히 준비합니다.'
  },
  {
    step: '04',
    title: 'Creation',
    titleKo: '작품 제작',
    desc: '플뢰르 드 뉘의 수석 플로리스트가 고도의 예술적 영감을 불어넣어 오직 한 분만을 위한 작품을 짓습니다.'
  },
  {
    step: '05',
    title: 'Delivery',
    titleKo: '안전 정중 배송',
    desc: '작품의 신선함과 완벽한 형태 보존을 위해 전문 차량으로 약속된 시간에 품격있게 전달해 드립니다.'
  }
];

const MOOD_COLLECTIONS = [
  {
    id: 'romantic',
    title: 'ROMANTIC',
    subtitle: '로맨틱 핑크 무드',
    description: '황홀한 노을빛을 닮은 부드러운 작약과 화이트 안개가 어우러져 온화하면서도 신비로운 감정을 극대화합니다.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPQNk--U6XAb9LsGQ-b8Avvpr94S8km_RBNkzcuGwWdn65LRn2U1yBoLksnizuNsFS96HxsVBK4pOAj_0FYvhO70sZquSfGtglw7txWYezFjSdYlDGZ6RT_No8-nhjL4qJqp6i9PZb0ebzCLyyYrBwoXOZHJNRowF916M4tNK7NGvY3zSHsuFuEoQzZ_ExmLQGxNdqHGLATNxzKOjqx8OsAdgU-mPpIDGL6Fbu2OcqO_1pjsvwyHJtA01ynjfS6J2QCgIGsgn1XPE',
    keyFlowers: ['핑크 작약', '수입 장미', '안개꽃', '스위트피']
  },
  {
    id: 'noir',
    title: 'NOIR',
    subtitle: '느와르 다크 바이올렛',
    description: '심연처럼 짙은 퍼플 칼라 릴리와 다크 버건디 로즈가 어우러져 관능적이며 묵직한 고풍스러움을 전달합니다.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFxIzkZVIFVgOg1YqyoSHQT-nZWUbS5qmHuHESkaJ3t7NNkE0TSfXGSttjmkk6a9sueDmJA-kxqEcOWHLyRubv2zWTjdBF_tC7qFpkH3tmLwzcJWO_3zM1A17ISDxJwwKJpvA75wlF48jWHNmrqDYFoRS3u3SakPJPvgKh2BSSK38XQh31rnzgdOhQciPrjlnxZz0N3n_HDvpxQdrZcUaWRnmM8aBb2hxAywTEKIvinMgfKzXmwA0_D0hr9luZ2dmBoUWMNrax4js',
    keyFlowers: ['퍼플 카라', '블랙 바카라 장미', '헬레보루스', '다크 리시안셔스']
  },
  {
    id: 'minimal',
    title: 'MINIMAL',
    subtitle: '미니멀 모던 세레니티',
    description: '정제된 선과 극도의 여백의 미를 살린 나뭇가지, 단 한 송이의 퓨어 백합이 오브제 같은 세련됨을 구현합니다.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJapJSr9hlYpAwt7X_kbYT5ta8mgc4O477tCKeQQX3AagtgJJuNWHzxsn2DcFx7wHDWpVdPkVFIfc0I_y5HVifTzAW5hJO7NcenOz8ss_2zi0RGyUgVmx3f6rFzG2QShMhIbBq59VSHT2z4exnyjWPO-Adk9aie5zduCQUAZFTpk8rPfeUAI_MooryS91nm2st3H7Im38Z0o_PLrzNPDcW-EqPou3ODwhN9uMC2AI1F7X7owD9oC0MMGJFIObTnJFQBChxPH7Mzao',
    keyFlowers: ['백합', '설유화 가지', '디자이너 수제 화기', '카네이션 오브제']
  },
  {
    id: 'seasonal',
    title: 'SEASONAL',
    subtitle: '시즈널 어텀 앰버',
    description: '오렌지 라넌큘러스와 풍성한 가을 와일드 베리, 따뜻한 앰버톤 소재들이 조화를 이루어 자연의 계절감을 선사합니다.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzxSGOZ8kIj-RRfzFCWMTNBhKSQuQMp7kdzysI9jrCuFwJZiwD86Q21iJM-9MIJ0XwVottstknnzaKSBijBwnNR9PhVlpx_0y2gDOtuQP4RQYRlZ-sHoX1UDhBB8Jc1FRGjZhxpJhQxUV9g4mkdwWI7eZH9WecULS7il7YgbIfzzJTsJGbfYpJu6BI3DtPW_TWrdizUGXhkFfjt-sIALo200p5yZkdGW9_BvpDVYWoEVCnTA1ZZbwUJVuRHah-EgFmfvqKexk1ui0',
    keyFlowers: ['라넌큘러스', '유칼립투스 폴리', '드라이 플라워', '앰버 로즈']
  }
];

const GALLERY_IMAGES = [
  {
    id: 'gallery1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEZvQvEW7IIhXd2wPmNAB_OhonrusjKncAJftoLICijJYqmDLDTZmDIUSrE2iyMvtK042t7r-T4ZHi0nt1JKAdTmaCgIS1B6I_DfND-p-21YuYUjAGZyszd5xNI23PYie9QjZCImFOv4uT1sqfqFCUcx20HvQgUwOH41qQCpQ7_5MAoBNq1TvlKgce7S8E0MFjsKEy7SqdgpG114pdneW7fGQZodmFd1zO_inXWCspPFCP5g6majjx4PDkPb318GmqO_mQNtYu2Nc',
    title: 'Midnight cascade',
    category: 'Jasmine and White Rose Arrangement',
    desc: '은은한 달빛 아래 흘러내리는 듯한 쟈스민 넝쿨과 순백의 장미가 빚어내는 초현실적인 로맨틱 무드 디자인.'
  },
  {
    id: 'gallery2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0ufTzXWrKiLoU3AMoFUYvihKpfDEKYAracznHFcDt3T4ca9Itso3POXOKcNY-uZGO78G1pLCJTTnfSgKYCthowzXbKgR3bstm0YjYhHXiwKyXSi3lHdlnM_ZPOOMI-SueUae7UUKYA6epD7r7MRx1PdiedAkiTP6pme7F1txn1kun-Kw9jnoOFAKnaJZ6r8HCazkU0NG1jRDG9-FqqgwvOiSLA9CC-hdW2DYvyQzhttFgaUjK1hUCSJUr69-lJdPXzDv1oTiKq4U',
    title: 'Imperial Gift Box',
    category: 'Luxury Embossed Flower Box',
    desc: '골드 실크 리본과 정교한 인그레이빙 기법 로고가 각인된 프리미엄 패키지 속에 숨겨진 고요한 꽃들의 하모니.'
  },
  {
    id: 'gallery3',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiU-020kwU4UsL2IuzASkgOCBT2YJDjyWpVHlz9rOaGOwNWPKaw-5wkQJGc85U1HrP1Chawpg7fySWUx7wtv1IGLgFMx-DaM5RdEe6EgPFplAevg7y4-6RmjRnjueRSglea2-eELk3ZiRk5WCZNiurHHaHwJSu7rS4oFwu4G5quVI4E62or7IH8EkA_wQ34bdqaR2JmtsWCZeluRSMAfkeHlz6IrQciPBZO_IuNavBzSo4-ZFNBIQ3arW2bRM3iaN9Fnw36r1kbZ8',
    title: 'Twilight Banquet Centerpiece',
    category: 'Vip Table Floral Design',
    desc: '최상위 귀빈 행사 및 프라이빗 디너를 위한 캔들 라이트 연출과 매혹적인 딥 다크 플로라 설치 아트.'
  },
  {
    id: 'gallery4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3Q3-QjhgEyY7cfYQlyfDY5H7i4fyBdNTLO7EWevpAWZMDL6LX31NIA7FXoHdv2dZToRpJ61CwNVpbKedsGYbmh0q6PzUZpjqMlC30Bo4hQEkdf3ki4p8h35n7KPXUVKF979KEtKXG8VazalTe8wOyp_CEckaUBKgasqhNGMsRMwyKGdbyVvIwFTWJ0w-FlsGN_NhWM3Pxzi6yHvhpGfS-frBg3xtJTsQ9-WdO8mXTv2btFG0Efm0SjC9EGwMXwqs1jOr27XGrgLk',
    title: 'Noir Velvet Bouquet',
    category: 'Anemone Wrap Bouquet',
    desc: '벨벳 매트 블랙 페이퍼와 황금 트와인으로 매칭해, 선명한 레드 아네모네가 드라마틱하게 돋보이는 랩핑 다발.'
  },
  {
    id: 'gallery5',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMJITFvIDXVBXkrZDsl_8dYiWlWihJtYty5NbDEvCm8AdRA6KkvbzDlCSorgABrxU4fB2YGI2HV4y-9EovC2RkTNu78MOYqPB2k5qEplBKl-fEeKymVAKuwVzP_x-ByBf-t-xbL81-HH1WiMJzWkfkJX3Vuomvzc7swTrglL0d1R2f9Mn1PCJqF0uOttnfvZfyguIPPpvabkI-jbBcIXVngJt9A5WrVlu03NL9HaAcGFekDllsGSCg4ANXwW1QfK4krnGWHhMjvBs',
    title: 'Florist Atelier Workbench',
    category: 'Creative Process Behind the Scene',
    desc: '예술적인 플로리스트의 공간 속 정돈된 엔티크 원목 도구들과 갓 다듬어진 자연 그대로의 프리미엄 꽃잎들.'
  },
  {
    id: 'gallery6',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrM2P2jlZT1ARdt4n7DeJs62PhFJXkAdg-1718WVMY_xb2y20pyD5FMawGsh2qKQ67AXiKUITrvEFhbYIqHhTPvsQVsv-Z0eSsww4o98sSqcvf57ib-EFx7M1j4b8PgkEwO_yY_E_tuTs_vx4VllSneSufOnA4G8K79GPrx9196SYgIW-AXcP-4rwngJzmCJeeXqQ2ZLvPvHa2wMwfRN20Q7Ocegcz-tQ49BsoxHMxCX6fmOr2meP1GbKyD7hxTC8J0aLnoaTs3D8',
    title: 'Architectural Orchid Installation',
    category: 'Sculptural Driftwood & White Orchid',
    desc: '오랜 자연의 질감을 지닌 유목과 순백의 우아함을 극대화한 호접란의 미학적 만남으로 탄생한 조형 꽃예술.'
  }
];

const CUSTOMER_REVIEWS = [
  {
    quote: '단순한 꽃다발이 아닌 예술 작품을 받은 느낌이었습니다. 제가 전달한 서툰 이야기들이 이렇게 아름다운 무드로 재탄생할 수 있다니 놀라웠어요. 평생 잊지 못할 프로포즈가 되었습니다.',
    author: 'Client Kim H.',
    type: 'Proposing Client'
  },
  {
    quote: '기념일을 위해 주문했는데, 아내가 꽃을 보자마자 눈물을 보였어요. 어떤 감정과 세심함으로 준비했는지 꽃들이 온전히 전해주는 것 같았습니다. 플뢰르 드 뉘만의 깊은 다크 무드는 독보적입니다.',
    author: 'Client Lee J.',
    type: 'Wedding Anniversary Client'
  },
  {
    quote: '브랜드 런칭 행사의 오프닝 오브제 플라워 아트를 의뢰했습니다. 밤에 어울리는 극도로 세련된 컬러 톤과 공간의 정체성을 완전히 압도하는 센스에 바이어들 모두 극찬을 아끼지 않았습니다.',
    author: 'Art Director Park',
    type: 'Luxury Fashion Brand Event Team'
  }
];

interface ReservationData {
  id: string;
  name: string;
  phone: string;
  date: string;
  occasion: string;
  preferredMood: string;
  budget: string;
  message: string;
  submittedAt: string;
  status: '상담 대기중' | '검토 중' | '디자인 확정' | '배송 준비';
}

export default function App() {
  // Navigation & Interactive states
  const [activeTab, setActiveTab] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Mood Collection active selection
  const [selectedMoodId, setSelectedMoodId] = useState('romantic');
  
  // Gallery lightbox modal states
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Form handling & Reservation list
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formOccasion, setFormOccasion] = useState('');
  const [formPreferredMood, setFormPreferredMood] = useState('');
  const [formBudget, setFormBudget] = useState('');
  const [formMessage, setFormMessage] = useState('');
  
  // Booking result/success states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [lastSubmissionCode, setLastSubmissionCode] = useState('');
  const [reservations, setReservations] = useState<ReservationData[]>([]);

  // Sound cue or visual interactions
  const [likeCount, setLikeCount] = useState<Record<string, number>>({});

  const reservationSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load existing reservations from localStorage
    const saved = localStorage.getItem('fleur_reservations');
    if (saved) {
      try {
        setReservations(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse reservations');
      }
    }

    // Load custom likes from localStorage
    const savedLikes = localStorage.getItem('fleur_likes');
    if (savedLikes) {
      try {
        setLikeCount(JSON.parse(savedLikes));
      } catch (e) {}
    }

    // Scroll listener for sticky header
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Intersection detection for links
      const sections = ['about', 'service', 'process', 'mood', 'gallery', 'reservation'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = {
      ...likeCount,
      [id]: (likeCount[id] || 0) + 1
    };
    setLikeCount(updated);
    localStorage.setItem('fleur_likes', JSON.stringify(updated));
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone || !formDate) {
      alert('성함, 연락처, 예약 일정을 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury boutique server verification
    setTimeout(() => {
      const confirmationCode = 'FN-' + Math.floor(100000 + Math.random() * 900000);
      const newReservation: ReservationData = {
        id: confirmationCode,
        name: formName,
        phone: formPhone,
        date: formDate,
        occasion: formOccasion || '프라이빗 맞춤 설계',
        preferredMood: formPreferredMood || '추천 무드',
        budget: formBudget || '유선 협의',
        message: formMessage,
        submittedAt: new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: '상담 대기중'
      };

      const updatedReservations = [newReservation, ...reservations];
      setReservations(updatedReservations);
      localStorage.setItem('fleur_reservations', JSON.stringify(updatedReservations));

      setLastSubmissionCode(confirmationCode);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Clear input fields
      setFormName('');
      setFormPhone('');
      setFormDate('');
      setFormOccasion('');
      setFormPreferredMood('');
      setFormBudget('');
      setFormMessage('');
    }, 1800);
  };

  const deleteReservationInquiry = (id: string) => {
    const filtered = reservations.filter(res => res.id !== id);
    setReservations(filtered);
    localStorage.setItem('fleur_reservations', JSON.stringify(filtered));
  };

  const handlePrevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : GALLERY_IMAGES.length - 1));
    }
  };

  const handleNextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev !== null && prev < GALLERY_IMAGES.length - 1 ? prev + 1 : 0));
    }
  };

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const activeMood = MOOD_COLLECTIONS.find(m => m.id === selectedMoodId) || MOOD_COLLECTIONS[0];

  return (
    <div className="bg-[#0A0A0A] text-[#e5e2e1] min-h-screen font-sans relative overflow-x-hidden selection:bg-gold-accent selection:text-[#0A0A0A]">
      
      {/* 1. Header (Sticky Top Navigation) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0ARe] bg-opacity-95 backdrop-blur-md py-4 border-b border-[#ffffff10] shadow-2xl'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo Brand Title */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full border border-gold-accent flex items-center justify-center bg-[#1c1b1b] overflow-hidden group-hover:scale-105 transition-all duration-500">
              <span className="font-serif text-xs text-gold-accent">FN</span>
            </div>
            <div>
              <span className="font-serif text-lg tracking-[0.15em] text-[#FDFCF0] font-light block leading-none">
                FLEUR DE NUIT
              </span>
              <span className="text-[9px] tracking-[0.45em] text-gold-accent block mt-1 uppercase text-opacity-85">
                밤에 피는 꽃
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {[
              { id: 'about', label: 'About' },
              { id: 'service', label: 'Service' },
              { id: 'process', label: 'The Process' },
              { id: 'mood', label: 'Mood Collection' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'reservation', label: 'Inquiry' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-sans text-[12px] uppercase tracking-widest font-semibold transition-all duration-300 relative py-2 ${
                  activeTab === item.id
                    ? 'text-gold-accent'
                    : 'text-[#c4c7c7] hover:text-[#FDFCF0]'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold-accent"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Reservation Call Action Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('reservation')}
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-transparent border border-outline/30 font-sans text-xs tracking-widest uppercase font-semibold text-[#FDFCF0] hover:border-gold-accent hover:text-gold-accent transition-all duration-500 group rounded-[4px]"
            >
              Reservation
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </button>

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#FDFCF0] hover:text-gold-accent transition-colors"
              aria-label="메뉴 열기"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] bg-opacity-98 backdrop-blur-xl pt-28 px-8 flex flex-col justify-start space-y-6"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-gold-accent"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col space-y-5 text-left border-t border-[#ffffff10] pt-8">
              {[
                { id: 'about', label: '플뢰르 드 뉘 소개 (About)' },
                { id: 'service', label: '예술적 서명 서비스 (Service)' },
                { id: 'process', label: '오더 프로세스 (The Process)' },
                { id: 'mood', label: '무드 컬렉션 (Mood Collection)' },
                { id: 'gallery', label: '포트폴리오 갤러리 (Gallery)' },
                { id: 'reservation', label: '비공개 예약 문의 (Inquiry)' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="font-serif text-lg tracking-wider text-[#FDFCF0] hover:text-gold-accent py-2 transition-colors border-b border-[#ffffff05] flex items-center justify-between"
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4 text-gold-accent" />
                </button>
              ))}
            </div>
            <div className="pt-8">
              <button
                onClick={() => scrollToSection('reservation')}
                className="w-full py-4 bg-gold-accent text-[#0A0A0A] uppercase font-bold tracking-widest text-sm rounded-[4px]"
              >
                1:1 맞춤 예약 제안하기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Moonlit vignette */}
        <div className="absolute inset-0 z-0 scale-105">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNe5m4b-iHde_NzdpK1P3Q7zsp4J-fYtLf1HMJBFhA1dUtr-8vNfKKBEfuzah-r7jHc1RlONn5ByvzDt3IxQRZ6EUv7YxsqfzJkI99e7UKodJ1arX5eTAf0v8RGNXQZthTlSzOv5nWQoRNqlXb1XXDSEioIxWzwkhULUUHpc9SL1z6EWOVAIX7yg3pimxsvkRz3cr0cz4-P4Ih8w_X5BdPReEYa4yF4uClxGWJT2u9ibugaOhogV0StkeyUuQuiEQqYXMxUa_gtxc"
            alt="Moonlit velvet roses background"
            className="w-full h-full object-cover brightness-[0.42] contrast-[1.1]"
            loading="eager"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl px-6 md:px-12 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <span className="text-xs uppercase tracking-[0.5em] text-gold-accent font-bold mb-4 block">
              Luxury Flower Boutique
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.1em] text-[#FDFCF0] font-normal leading-none mb-3 drop-shadow-2xl">
              FLEUR DE NUIT
            </h1>
            <p className="font-serif text-xl md:text-2xl italic tracking-[0.3em] mb-10 text-gold-accent text-glow">
              밤에 피는 꽃
            </p>

            <p className="font-sans text-sm md:text-lg text-[#c4c7c7] max-w-2xl mx-auto leading-relaxed font-light mb-12">
              가장 깊은 밤, 오직 당신만을 위해 피어나는 세상 단 하나의 서사 이야기.
              <br />
              플뢰르 드 뉘는 고요한 밤의 감수성과 타협 없는 정교한 예술성으로 아름다운 순간을 꽃으로 기록합니다.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <button
                onClick={() => scrollToSection('reservation')}
                className="w-full sm:w-auto px-10 py-4.5 bg-gold-accent text-[#0A0A0A] font-sans text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#b08e4d] transition-all duration-300 shadow-xl rounded-[2px]"
              >
                예약 문의하기
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="w-full sm:w-auto px-10 py-4.5 border border-[#ffffff30] bg-black bg-opacity-20 text-[#FDFCF0] font-sans text-xs font-semibold tracking-[0.2em] uppercase hover:border-gold-accent hover:text-gold-accent transition-all duration-300 rounded-[2px]"
              >
                포트폴리오 보기
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10 opacity-70 hover:opacity-100 transition-opacity" onClick={() => scrollToSection('about')}>
          <span className="text-[9px] tracking-[0.4em] text-gold-accent font-semibold uppercase">Scroll Down</span>
          <div className="w-[1px] h-10 bg-gold-accent relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 40, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute top-0 left-0 right-0 h-4 bg-[#FDFCF0]"
            />
          </div>
        </div>
      </section>

      {/* 3. Brand Story (Philosophy) */}
      <section id="about" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#ffffff05]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="flex items-center gap-3">
              <span className="w-10 h-[1px] bg-gold-accent"></span>
              <span className="font-sans text-xs tracking-[0.3em] text-gold-accent uppercase font-bold">
                PHILOSOPHY
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl lg:text-[46px] leading-snug text-[#FDFCF0] font-light">
              우리는 당신의 <br />
              <span className="italic text-gold-accent">이야기</span>를 듣습니다.
            </h2>

            <div className="space-y-6 font-sans text-sm md:text-base text-[#c4c7c7] leading-relaxed font-light">
              <p>
                플뢰르 드 뉘는 대량 생산되는 전형적인 디자인의 꽃이 아닙니다.
                한 사람만을 위한 고귀한 예술을 창조하기 위해, 고객 한 분 한 분의 서사와 숨겨진 감정을 깊은 인터뷰를 통해 고스란히 담아내는 100% 프라이빗 예약제 플라워 아틀리에입니다.
              </p>
              <p>
                우리는 밤이 주는 신비로운 고요함과 고결하고 매혹적인 어둠의 무드에서 독보적인 예술적 감수성을 도출합니다. 어둠 속에서도 가장 눈부시게 찬란히 어우러지는 희귀 식물과 프리미엄 꽃들을 통해 오직 당신만을 위해 피어납니다.
              </p>
            </div>

            <div className="pt-4">
              <p className="font-serif text-lg italic text-[#FDFCF0] font-light border-l-2 border-gold-accent pl-6 py-1">
                "밤에만 느낄 수 있는 깊고 사색적인 미학, 고귀한 비스포크 예술"
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Soft decorative golden box framing */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 border border-gold-accent border-opacity-25 rounded-[4px] hidden lg:block z-0"></div>
            
            <div className="relative z-10 overflow-hidden aspect-[3/4] shadow-2xl rounded-[4px] border border-[#ffffff10]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4FvQvWEEorP8r2CCeGY73zHSi9vrjMYg67mZAARw_VIipSV8YSw00wh_KbfzLTeq3Fn3Dms3pjnb65RRev4aTa4a3V5U6z8b0L7k-i-ETIRqQQt8aUksnHY7Iu9UTMWW9p2b5D4sM4s_6uYApK-mt5kvAjM7vcdjM_k_-kI3EV43K31UbNMyB_nKLDhbLfH-o3XC1zTN7n2RYTFtJxYRyIHoYr2zxnM6xHAnAf7YyYo4PX6C9um1h-Q-99YGrQ_6h4lNPBKpB7og"
                alt="Florist's hands arrange a white rose in dark atelier"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60"></div>
              
              {/* Quick details badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#0E0E0E] bg-opacity-80 backdrop-blur-md border border-[#ffffff10] p-4 rounded-[2px] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-gold-accent block tracking-widest font-semibold">Atelier Work</span>
                  <span className="text-xs text-[#FDFCF0] font-serif tracking-wider font-light">By Master Florist</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-gold-accent animate-ping" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Signature Services */}
      <section id="service" className="py-24 bg-[#0E0E0E] border-b border-[#ffffff05]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-accent font-bold">
              Exclusive Offerings
            </span>
            <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-[#FDFCF0] font-light">
              Signature Services
            </h2>
            <div className="w-16 h-[1.5px] bg-gold-accent mx-auto mt-6"></div>
            <p className="text-sm text-[#c4c7c7] font-light pt-2">
              오직 플뢰르 드 뉘에서만 조우할 수 있는 수집가적 가치를 지닌 프라이빗 대표 플로럴 컬렉션입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SIGNATURE_SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group flex flex-col h-full bg-[#141313] border border-[#ffffff05] p-5 hover:border-gold-accent hover:border-opacity-30 transition-all duration-500 rounded-[4px] relative"
              >
                {/* Arrangement image box */}
                <div className="relative overflow-hidden aspect-[4/5] mb-6 rounded-[2px] border border-[#ffffff05]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
                  
                  {/* Hearts/Likes button for interactive engagement */}
                  <button
                    onClick={(e) => handleLike(service.id, e)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0A0A0A] bg-opacity-70 backdrop-blur-sm flex items-center justify-center border border-[#ffffff10] text-gold-accent hover:bg-gold-accent hover:text-[#0A0A0A] transition-colors"
                    aria-label="관심 등록"
                  >
                    <Heart className="w-4 h-4 fill-current text-glow" />
                  </button>

                  <div className="absolute bottom-3 left-3 bg-[#0A0A0A] bg-opacity-85 border border-[#ffffff10] px-2.5 py-1 text-[10px] text-gold-accent tracking-widest uppercase rounded-[1px] font-semibold">
                    {service.priceRange}
                  </div>
                </div>

                {/* Typography info */}
                <h3 className="font-serif text-xl text-[#FDFCF0] font-light mb-1 tracking-wide group-hover:text-gold-accent transition-colors">
                  {service.title}
                </h3>
                <span className="text-xs text-gold-accent tracking-widest font-serif block mb-3 opacity-90">
                  {service.subtitle}
                </span>
                <p className="text-xs md:text-sm text-[#c4c7c7] font-light leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Detailed Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#ffffff05]">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-[#1c1b1b] border border-[#ffffff05] text-[#c4c7c7] rounded-[2px]">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Custom click indicator */}
                <div className="mt-4 flex items-center justify-between text-xs text-gold-accent font-semibold group-hover:translate-x-1 transition-transform cursor-pointer" onClick={() => scrollToSection('reservation')}>
                  <span>상담 받기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>

                {/* Display total dynamic likes count */}
                {(likeCount[service.id] || 0) > 0 && (
                  <div className="absolute -top-2 left-6 bg-gold-accent text-[#0A0A0A] text-[9px] px-2 py-0.5 rounded-full font-bold tracking-widest">
                    LIKE +{likeCount[service.id]}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. The Process Section */}
      <section id="process" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#ffffff05]">
        <div className="text-left max-w-3xl mb-20 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-[1px] bg-gold-accent"></span>
            <span className="font-sans text-xs tracking-[0.3em] text-gold-accent uppercase font-bold">
              ATELIER SERVICE
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-[#FDFCF0] font-light">
            The Process
          </h2>
          <p className="text-sm md:text-base text-[#c4c7c7] max-w-xl font-light leading-relaxed">
            한 분의 의뢰인을 위해 첫 대화부터 정성껏 디자인하여 안전하게 배송하기까지의 고결한 예술 여정입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[36px] left-[40px] right-[40px] h-[1px] bg-gradient-to-r from-gold-accent via-[#4A0E0E] to-gold-accent opacity-20 z-0"></div>

          {THE_PROCESS.map((p, index) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative z-10 group flex flex-col text-left"
            >
              <div className="w-[72px] h-[72px] rounded-full bg-[#141313] border border-[#ffffff15] group-hover:border-gold-accent flex items-center justify-center mb-6 font-serif text-xl font-normal text-gold-accent group-hover:bg-gold-accent group-hover:text-[#0A0A0A] transition-all duration-500 shadow-xl">
                {p.step}
              </div>
              
              <h4 className="font-serif text-lg text-[#FDFCF0] group-hover:text-gold-accent transition-colors font-light leading-none mb-1">
                {p.title}
              </h4>
              <span className="text-[11px] tracking-wider text-gold-accent font-sans uppercase font-bold block mb-3 opacity-90">
                {p.titleKo}
              </span>
              <p className="text-xs md:text-sm text-[#c4c7c7] font-light leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Mood Collection Section (Highly Interactive Tab layout) */}
      <section id="mood" className="py-24 bg-[#141313] border-b border-[#ffffff05]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div className="text-left space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-gold-accent font-bold block">
                AESTHETIC DESIGNS
              </span>
              <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-[#FDFCF0] font-light">
                Mood Collection
              </h2>
            </div>
            <p className="text-sm text-[#c4c7c7] max-w-md font-light leading-relaxed lg:text-right">
              플뢰르 드 뉘가 정교히 연구한 네 가지의 대표적인 아티스틱 무드 테마입니다. 각 무드는 다른 깊이의 메시지와 독보적인 연출을 선사합니다.
            </p>
          </div>

          {/* Interactive Mood Tab Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {MOOD_COLLECTIONS.map(mood => (
              <button
                key={mood.id}
                onClick={() => setSelectedMoodId(mood.id)}
                className={`group relative aspect-[3/4] overflow-hidden rounded-[4px] border transition-all duration-500 ${
                  selectedMoodId === mood.id
                    ? 'border-gold-accent shadow-[0_0_15px_rgba(197,160,89,0.25)] scale-[1.02]'
                    : 'border-[#ffffff10] hover:border-gold-accent hover:border-opacity-40'
                }`}
              >
                <img
                  src={mood.image}
                  alt={mood.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-[0.7] group-hover:brightness-[0.8]"
                />
                
                {/* Accent overlay with name */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-5 text-left">
                  <span className="font-serif text-2xl tracking-[0.08em] text-[#FDFCF0] font-light mb-1">
                    {mood.title}
                  </span>
                  <span className="text-[10px] tracking-widest text-gold-accent font-sans font-bold uppercase">
                    {mood.subtitle}
                  </span>
                </div>

                {/* Selection indicator line */}
                {selectedMoodId === mood.id && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gold-accent" />
                )}
              </button>
            ))}
          </div>

          {/* Selected Mood Detailed Viewer card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMoodId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="bg-[#0E0E0E] border border-gold-accent border-opacity-15 p-8 md:p-12 rounded-[4px]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 text-left space-y-6">
                  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#141313] border border-gold-accent border-opacity-20 rounded-[2px]">
                    <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
                    <span className="text-xs uppercase text-gold-accent tracking-widest font-bold">
                      Selected Theme: {activeMood.title}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-4xl text-[#FDFCF0] font-light">
                    {activeMood.subtitle}
                  </h3>

                  <p className="text-sm md:text-base text-[#c4c7c7] font-light leading-relaxed max-w-3xl">
                    {activeMood.description}
                  </p>

                  <div className="pt-4 border-t border-[#ffffff05] space-y-3">
                    <span className="text-xs uppercase text-gold-accent tracking-widest font-bold block">
                      주요 연출 희귀 플라워 (Featured Materials)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeMood.keyFlowers.map(flower => (
                        <span
                          key={flower}
                          className="text-xs px-3 py-1.5 bg-[#141313] text-[#FDFCF0] border border-[#ffffff08] rounded-[2px]"
                        >
                          {flower}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex justify-end">
                  <button
                    onClick={() => {
                      setFormPreferredMood(`${activeMood.title} (${activeMood.subtitle})`);
                      scrollToSection('reservation');
                    }}
                    className="w-full lg:w-auto px-8 py-4 bg-transparent border border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-[#0A0A0A] font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 rounded-[2px]"
                  >
                    이 무드로 디자인 상담 받기
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* 7. Gallery Section (Immersive Grid with fully working Lightbox) */}
      <section id="gallery" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#ffffff05]">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-accent font-bold block">
            ARTISTIC PORTFOLIO
          </span>
          <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-[#FDFCF0] font-light">
            The Gallery
          </h2>
          <p className="text-sm text-[#c4c7c7] font-light max-w-md mx-auto">
            달빛 아래 밤의 아틀리에에서 빚어진 플뢰르 드 뉘의 고귀한 마스터피스 포트폴리오를 경험해보세요.
          </p>
        </div>

        {/* Masonry Grid of images */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              onClick={() => setLightboxIndex(index)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-[4px] border border-[#ffffff05] hover:border-gold-accent hover:border-opacity-30 transition-all duration-500"
            >
              <img
                src={img.image}
                alt={img.title}
                className="w-full object-cover transition-transform duration-1000 group-hover:scale-105 brightness-95 group-hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-xs uppercase text-gold-accent tracking-widest font-bold mb-1">
                  {img.category}
                </span>
                <h4 className="font-serif text-xl text-[#FDFCF0] font-light mb-2">
                  {img.title}
                </h4>
                <p className="text-xs text-[#c4c7c7] font-light opacity-90 line-clamp-2">
                  {img.desc}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-gold-accent font-bold">
                  <span>자세히 보기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Immersive Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0A0A0A] bg-opacity-98 backdrop-blur-md flex flex-col justify-between p-6"
          >
            {/* Top Bar inside modal */}
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto py-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase text-gold-accent font-bold tracking-widest px-2 py-0.5 border border-gold-accent border-opacity-35 rounded-[2px]">
                  Fleur de Nuit Premium Portfolio
                </span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-3 bg-[#141313] rounded-full border border-[#ffffff10] text-[#FDFCF0] hover:text-gold-accent hover:border-gold-accent transition-colors"
                aria-label="닫기"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Immersive central display */}
            <div className="flex-grow flex items-center justify-between w-full max-w-7xl mx-auto my-4 gap-4 relative">
              
              {/* Left Arrow */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 z-10 p-3 rounded-full bg-[#141313] bg-opacity-80 border border-[#ffffff10] text-gold-accent hover:bg-gold-accent hover:text-[#0A0A0A] transition-all"
                aria-label="이전 이미지"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Image content card */}
              <div className="w-full h-full max-h-[60vh] md:max-h-[70vh] flex items-center justify-center p-2">
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  src={GALLERY_IMAGES[lightboxIndex].image}
                  alt={GALLERY_IMAGES[lightboxIndex].title}
                  className="max-w-full max-h-full object-contain rounded-[4px] border border-[#ffffff08] shadow-2xl"
                />
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNextImage}
                className="absolute right-2 z-10 p-3 rounded-full bg-[#141313] bg-opacity-80 border border-[#ffffff10] text-gold-accent hover:bg-gold-accent hover:text-[#0A0A0A] transition-all"
                aria-label="다음 이미지"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom details card */}
            <div className="w-full max-w-4xl mx-auto bg-[#141313] border border-[#ffffff08] p-6 rounded-[4px] text-left space-y-3 mb-4">
              <span className="text-xs uppercase text-gold-accent tracking-widest font-bold">
                {GALLERY_IMAGES[lightboxIndex].category}
              </span>
              <h3 className="font-serif text-xl md:text-3xl text-[#FDFCF0] font-light leading-none">
                {GALLERY_IMAGES[lightboxIndex].title}
              </h3>
              <p className="text-xs md:text-sm text-[#c4c7c7] font-light leading-relaxed">
                {GALLERY_IMAGES[lightboxIndex].desc}
              </p>

              <div className="flex justify-between items-center pt-3 border-t border-[#ffffff05]">
                <div className="text-[11px] text-[#c4c7c7]">
                  {lightboxIndex + 1} / {GALLERY_IMAGES.length} 작품
                </div>
                <button
                  onClick={() => {
                    setFormMessage(`[${GALLERY_IMAGES[lightboxIndex!].title}] 작품 스타일의 예약을 의뢰합니다.`);
                    setLightboxIndex(null);
                    scrollToSection('reservation');
                  }}
                  className="px-5 py-2.5 bg-gold-accent text-[#0A0A0A] text-[11px] font-bold tracking-wider rounded-[2px]"
                >
                  이 스타일로 견적 의뢰하기
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Reservation Inquiry Form & Active History Tracker */}
      <section id="reservation" ref={reservationSectionRef} className="py-24 bg-[#0E0E0E] border-b border-[#ffffff05]">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="border border-gold-accent border-opacity-15 p-8 md:p-16 bg-[#141313] shadow-2xl rounded-[4px] relative overflow-hidden">
            
            {/* Elegant decorative background watermarks */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A0E0E] rounded-full blur-[80px] opacity-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-accent rounded-full blur-[100px] opacity-10" />

            {/* Reservation form header */}
            <div className="text-center mb-16 relative z-10 space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-gold-accent font-bold">
                Bespoke Order
              </span>
              <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-[#FDFCF0] font-light">
                Reservation Inquiry
              </h2>
              <p className="text-xs md:text-sm text-[#c4c7c7] max-w-md mx-auto font-light leading-relaxed">
                모든 디자인과 연출은 100% 비공개 예약제로 세심히 이루어집니다. 소중한 순간에 빛날 당신만의 예술적 취향을 일러주십시오.
              </p>
            </div>

            {/* Submission success or Loading screen */}
            {isSubmitting ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-6">
                <div className="w-12 h-12 border-4 border-gold-accent border-t-transparent rounded-full animate-spin" />
                <p className="font-serif text-lg text-gold-accent animate-pulse italic">
                  플뢰르 드 뉘 아틀리에에서 디자인 제안서를 기안 중입니다...
                </p>
              </div>
            ) : submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-8"
              >
                <div className="w-16 h-16 bg-gold-accent bg-opacity-10 border border-gold-accent rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-gold-accent" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-2xl md:text-3xl text-[#FDFCF0] font-light">
                    예약 상담 요청이 성공적으로 전송되었습니다.
                  </h3>
                  <p className="text-xs md:text-sm text-[#c4c7c7] max-w-lg mx-auto leading-relaxed font-light">
                    의뢰해주신 플로럴 컨셉과 스토리를 바탕으로 수석 플로리스트가 일대일 검토 후 영업일 기준 24시간 이내에 품격 있는 개별 유선 제안을 드리겠습니다.
                  </p>
                </div>

                {/* Simulated confirmation card */}
                <div className="max-w-md mx-auto bg-[#0A0A0A] border border-gold-accent border-opacity-30 p-6 rounded-[2px] text-left font-sans space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-[#ffffff10]">
                    <span className="text-[10px] text-gold-accent font-bold uppercase tracking-wider">Consultation Code</span>
                    <span className="font-serif text-gold-accent font-bold text-sm tracking-wider">{lastSubmissionCode}</span>
                  </div>
                  <div className="text-xs text-[#c4c7c7] space-y-1">
                    <p>• 고객명: <span className="text-[#FDFCF0] font-semibold">본인 확인 완료</span></p>
                    <p>• 예약 희망일: <span className="text-[#FDFCF0] font-semibold">지정된 날짜</span></p>
                    <p>• 상담 단계: <span className="text-gold-accent font-semibold">수석 디자이너 1:1 배정 대기중</span></p>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-8 py-3 bg-[#0A0A0A] border border-[#ffffff20] text-[#c4c7c7] hover:text-gold-accent hover:border-gold-accent text-xs font-semibold tracking-widest uppercase rounded-[2px] transition-all"
                  >
                    새 문의 작성하기
                  </button>
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      scrollToSection('hero');
                    }}
                    className="px-8 py-3 bg-gold-accent text-[#0A0A0A] text-xs font-bold tracking-widest uppercase rounded-[2px] transition-all"
                  >
                    홈으로 가기
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  
                  {/* Name field */}
                  <div className="flex flex-col text-left space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gold-accent font-bold">
                      Name (성함) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-0 top-3 text-[#c4c7c7] opacity-60">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="의뢰하시는 고객님의 성함"
                        className="w-full bg-transparent border-b border-[#ffffff15] focus:border-gold-accent py-3 pl-7 text-sm outline-none text-[#FDFCF0] placeholder-outline/35 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col text-left space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gold-accent font-bold">
                      Phone (연락처) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-0 top-3 text-[#c4c7c7] opacity-60">
                        <Phone className="w-4 h-4" />
                      </span>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="연락 가능한 휴대전화 번호"
                        className="w-full bg-transparent border-b border-[#ffffff15] focus:border-gold-accent py-3 pl-7 text-sm outline-none text-[#FDFCF0] placeholder-outline/35 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Date field */}
                  <div className="flex flex-col text-left space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gold-accent font-bold">
                      Date (예약 희망 일정) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-0 top-3 text-[#c4c7c7] opacity-60">
                        <Calendar className="w-4 h-4" />
                      </span>
                      <input
                        type="date"
                        required
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full bg-transparent border-b border-[#ffffff15] focus:border-gold-accent py-3 pl-7 text-sm outline-none text-[#FDFCF0] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Occasion dropdown select */}
                  <div className="flex flex-col text-left space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gold-accent font-bold">
                      Occasion (전달 목적)
                    </label>
                    <div className="relative">
                      <span className="absolute left-0 top-3 text-[#c4c7c7] opacity-60">
                        <Tag className="w-4 h-4" />
                      </span>
                      <select
                        value={formOccasion}
                        onChange={(e) => setFormOccasion(e.target.value)}
                        className="w-full bg-transparent border-b border-[#ffffff15] focus:border-gold-accent py-3 pl-7 text-sm outline-none text-[#c4c7c7] transition-colors appearance-none"
                      >
                        <option value="" className="bg-[#141313] text-[#c4c7c7]">선택 사항 (목적)</option>
                        <option value="기념일 (Anniversary)" className="bg-[#141313] text-[#FDFCF0]">기념일 (Anniversary)</option>
                        <option value="프로포즈 (Proposal)" className="bg-[#141313] text-[#FDFCF0]">프로포즈 (Proposal)</option>
                        <option value="고품격 선물 (Gift)" className="bg-[#141313] text-[#FDFCF0]">고품격 선물 (Gift)</option>
                        <option value="브랜드/행사 연출 (Event)" className="bg-[#141313] text-[#FDFCF0]">브랜드/행사 연출 (Event)</option>
                        <option value="기타 프라이빗 오더" className="bg-[#141313] text-[#FDFCF0]">기타 프라이빗 오더</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Mood field */}
                  <div className="flex flex-col text-left space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gold-accent font-bold">
                      Preferred Mood (희망 분위기)
                    </label>
                    <div className="relative">
                      <span className="absolute left-0 top-3 text-[#c4c7c7] opacity-60">
                        <Compass className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        value={formPreferredMood}
                        onChange={(e) => setFormPreferredMood(e.target.value)}
                        placeholder="예: 다크 느와르 무드, 로맨틱 핑크 무드"
                        className="w-full bg-transparent border-b border-[#ffffff15] focus:border-gold-accent py-3 pl-7 text-sm outline-none text-[#FDFCF0] placeholder-outline/35 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Budget field */}
                  <div className="flex flex-col text-left space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gold-accent font-bold">
                      Budget (예상 예산 범위)
                    </label>
                    <div className="relative">
                      <span className="absolute left-0 top-3 text-[#c4c7c7] opacity-60">
                        <DollarSign className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        value={formBudget}
                        onChange={(e) => setFormBudget(e.target.value)}
                        placeholder="예: 20만원 대, 50만원 선, 무관"
                        className="w-full bg-transparent border-b border-[#ffffff15] focus:border-gold-accent py-3 pl-7 text-sm outline-none text-[#FDFCF0] placeholder-outline/35 transition-colors"
                      />
                    </div>
                  </div>

                </div>

                {/* Detailed Message field */}
                <div className="flex flex-col text-left space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gold-accent font-bold">
                    Your Story / Message (전하고 싶으신 이야기)
                  </label>
                  <div className="relative">
                    <span className="absolute left-0 top-3 text-[#c4c7c7] opacity-60">
                      <MessageSquare className="w-4 h-4" />
                    </span>
                    <textarea
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="꽃을 선물하시는 상대방과의 이야기, 특별히 담고 싶은 감정이나 선호하시는 특정 생화 종류가 있으시다면 자세히 기재해 주세요."
                      rows={4}
                      className="w-full bg-transparent border-b border-[#ffffff15] focus:border-gold-accent py-3 pl-7 text-sm outline-none text-[#FDFCF0] placeholder-outline/35 transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-center pt-8">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-20 py-4.5 bg-gold-accent text-[#0A0A0A] font-sans text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#b08e4d] transition-all duration-300 rounded-[2px]"
                  >
                    Submit Request (비공개 예약서 송신)
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Fully working Reservation History Tracker */}
          {reservations.length > 0 && (
            <div className="mt-16 text-left space-y-6">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-accent" />
                <h3 className="font-serif text-lg tracking-wider text-[#FDFCF0] font-light">
                  고객님의 예약 신청 현황 (My Requests)
                </h3>
              </div>

              <div className="space-y-4">
                {reservations.map(res => (
                  <div
                    key={res.id}
                    className="bg-[#141313] border border-[#ffffff05] p-5 rounded-[4px] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-gold-accent hover:border-opacity-15 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm text-gold-accent font-semibold">{res.id}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-gold-accent bg-opacity-10 text-gold-accent border border-gold-accent border-opacity-20 rounded-[2px] font-bold">
                          {res.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#c4c7c7]">
                        신청일: {res.submittedAt} | 예약 희망일: <span className="text-[#FDFCF0] font-medium">{res.date}</span>
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        의뢰 목적: {res.occasion} | 분위기: {res.preferredMood}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          alert(`현재 예약 상태는 [${res.status}] 입니다.\n고객님의 의뢰에 대해 담당 시니어 플로리스트가 일대일로 꼼꼼히 구상하고 있습니다.\n\n문의사항은 고객센터(By appointment only)를 통해 전달 부탁드립니다.`);
                        }}
                        className="px-4 py-2 bg-transparent border border-outline/20 hover:border-gold-accent hover:text-gold-accent text-[11px] text-[#c4c7c7] rounded-[2px] transition-colors"
                      >
                        상태 세부조회
                      </button>
                      <button
                        onClick={() => deleteReservationInquiry(res.id)}
                        className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                        title="신청 취소"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 9. Customer Review Section */}
      <section className="py-24 md:py-32 bg-[#141313] border-b border-[#ffffff05]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          
          <div className="max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-accent font-bold block">
              EXPERIENCES
            </span>
            <h2 className="font-serif text-3xl md:text-5xl italic tracking-wide text-[#FDFCF0] font-light">
              "달빛 아래 기록된 우리의 순간들"
            </h2>
            <div className="w-12 h-[1px] bg-gold-accent mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {CUSTOMER_REVIEWS.map((review, i) => (
              <motion.div
                key={review.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-[#0E0E0E] border border-[#ffffff05] p-8 hover:border-gold-accent hover:border-opacity-10 transition-all duration-500 rounded-[4px] flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Elegant quotation mark representation */}
                  <span className="font-serif text-5xl text-gold-accent leading-none block opacity-30 select-none">“</span>
                  <p className="font-sans text-sm md:text-base text-[#c4c7c7] leading-relaxed font-light">
                    {review.quote}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#ffffff05] flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-gold-accent"></div>
                  <div>
                    <h5 className="font-serif text-sm text-[#FDFCF0] font-medium leading-none mb-1">
                      {review.author}
                    </h5>
                    <span className="text-[10px] text-gold-accent tracking-widest font-sans uppercase block">
                      {review.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Footer Section */}
      <footer className="bg-[#0E0E0E] text-[#c4c7c7] pt-24 pb-12 border-t border-[#ffffff05]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center space-y-12">
          
          {/* Logo brand */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full border border-gold-accent border-opacity-40 flex items-center justify-center bg-[#141313] mx-auto">
              <span className="font-serif text-base text-gold-accent font-light">FN</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-[#FDFCF0] font-light uppercase">
              FLEUR DE NUIT
            </h2>
            <div className="w-12 h-[1px] bg-gold-accent mx-auto"></div>
          </div>

          <div className="space-y-3 max-w-lg">
            <p className="font-sans text-sm text-[#c4c7c7] leading-relaxed font-light">
              플뢰르 드 뉘는 오직 깊은 대화와 고도의 연출 품질 유지를 위해 하루 한정된 프라이빗 예약만을 엄격히 소화합니다.
            </p>
            <span className="text-xs uppercase text-gold-accent tracking-widest font-bold block">
              BY APPOINTMENT ONLY.
            </span>
          </div>

          {/* Social icons */}
          <div className="flex justify-center space-x-12 pt-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs uppercase tracking-widest text-[#c4c7c7] hover:text-gold-accent transition-colors"
            >
              <Instagram className="w-4 h-4 text-gold-accent group-hover:scale-110 transition-transform" />
              <span>Instagram</span>
            </a>
            <a
              href="https://kakao.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs uppercase tracking-widest text-[#c4c7c7] hover:text-gold-accent transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-gold-accent group-hover:scale-110 transition-transform" />
              <span>KakaoTalk</span>
            </a>
            <a
              href="mailto:boutique@fleurdenuit.com"
              className="group flex items-center gap-2 text-xs uppercase tracking-widest text-[#c4c7c7] hover:text-gold-accent transition-colors"
            >
              <Mail className="w-4 h-4 text-gold-accent group-hover:scale-110 transition-transform" />
              <span>Email</span>
            </a>
          </div>

          {/* Bottom license line */}
          <div className="pt-12 border-t border-[#ffffff05] w-full text-center space-y-2">
            <p className="text-[10px] tracking-wider text-slate-500 uppercase font-semibold">
              © 2026 FLEUR DE NUIT. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[9px] text-slate-600">
              본 웹사이트의 사진 저작권 및 1:1 맞춤형 플라워 어레인지먼트 디자인 저작권은 플뢰르 드 뉘 아틀리에에 있습니다.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
