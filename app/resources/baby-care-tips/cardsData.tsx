export interface CardProps {
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    link?: string;
    id:number;
  }
  
  export const cardsData: CardProps[] = [
    {
        id: 1,
        title: "Essential Newborn Care Guide",
        description: "Learn the basics of newborn care including bathing, feeding, and sleep schedules for your little one.",
        category: "Newborn",
        imageUrl: "./assets/IMG-20250122-WA0015.jpg",
        link: "https://www.healthychildren.org/English/ages-stages/baby/Pages/default.aspx"
      },
      {
        id: 2,
        title: "Breastfeeding Tips & Techniques",
        description: "Expert advice on breastfeeding positions, latching, and maintaining milk supply for nursing mothers.",
        category: "Feeding",
        imageUrl: "./assets/IMG-20250122-WA0016.jpg",
        link: "https://www.cdc.gov/breastfeeding/recommendations/index.htm"
      },
      {
        id: 3,
        title: "Baby Sleep Solutions",
        description: "Discover effective methods to help your baby develop healthy sleep habits and routines.",
        category: "Sleep",
        imageUrl: "./assets/IMG-20250122-WA0017.jpg",
        link: "https://www.sleepfoundation.org/baby-sleep"
      },
      {
        id: 4,
        title: "First Year Milestones",
        description: "Track your baby's development milestones and learn what to expect during the first year.",
        category: "Development",
        imageUrl: "./assets/IMG-20250122-WA0020.jpg",
        link: "https://www.cdc.gov/ncbddd/actearly/milestones/index.html"
      },
      {
        id: 5,
        title: "Baby Safety at Home",
        description: "Essential tips for baby-proofing your home and creating a safe environment for your little one.",
        category: "Safety",
        imageUrl: "./assets/IMG-20250122-WA0016.jpg",
        link: "https://www.safekids.org/baby"
      },
      {
        id: 6,
        title: "Infant Nutrition Guide",
        description: "Complete guide to infant nutrition, including when to introduce solid foods and healthy feeding practices.",
        category: "Nutrition",
        imageUrl: "./assets/IMG-20250122-WA0016.jpg",
        link: "https://www.who.int/health-topics/infant-nutrition"
      },
      {
        id: 7,
        title: "Baby Health Basics",
        description: "Learn about common health concerns and when to contact your pediatrician.",
        category: "Health",
        imageUrl: "/lovable-uploads/6f65f251-ed0b-445c-ad1c-025ad708ebf6.png",
        link: "https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/basics/infant-and-toddler-health/hlv-20049400"
      },
      {
        id: 8,
        title: "Tummy Time Activities",
        description: "Fun and effective tummy time exercises to strengthen your baby's muscles and development.",
        category: "Development",
        imageUrl: "/lovable-uploads/7eb2c73c-1e46-4aa5-81d2-196bb4abee43.png",
        link: "https://pathways.org/topics/tummy-time/"
      },
      {
        id: 9,
        title: "Postpartum Recovery Tips",
        description: "Self-care tips and recovery guidance for new mothers in the postpartum period.",
        category: "Postpartum",
        imageUrl: "/lovable-uploads/6f65f251-ed0b-445c-ad1c-025ad708ebf6.png",
        link: "https://www.womenshealth.gov/pregnancy/childbirth-and-beyond/recovering-birth"
      },
      {
        id: 10,
        title: "Baby Massage Techniques",
        description: "Learn gentle massage techniques to soothe your baby and promote bonding.",
        category: "Bonding",
        imageUrl: "./assets/IMG-20250122-WA0020.jpg",
        link: "https://www.healthline.com/health/baby/baby-massage"
      },
      {
        id: 11,
        title: "Baby-Led Weaning Guide",
        description: "Introduction to solid foods through baby-led weaning approach.",
        category: "Feeding",
        imageUrl: "./assets/IMG-20250122-WA0015.jpg",
        link: "https://www.nhs.uk/start4life/weaning/what-to-feed-your-baby/around-6-months"
      },
      {
        id: 12,
        title: "Infant CPR Basics",
        description: "Essential CPR techniques every parent should know for infants.",
        category: "Safety",
        imageUrl: "./assets/IMG-20250122-WA0016.jpg",
        link: "https://www.redcross.org/take-a-class/cpr/performing-cpr/child-baby-cpr"
      },
      {
        id: 13,
        title: "Baby Sign Language",
        description: "Teaching basic sign language to enhance communication with your baby.",
        category: "Development",
        imageUrl: "/lovable-uploads/7eb2c73c-1e46-4aa5-81d2-196bb4abee43.png",
        link: "https://www.babysignlanguage.com/basics/"
      },
      {
        id: 14,
        title: "Infant Dental Care",
        description: "Proper dental hygiene practices for babies and toddlers.",
        category: "Health",
        imageUrl: "/lovable-uploads/6f65f251-ed0b-445c-ad1c-025ad708ebf6.png",
        link: "https://www.mouthhealthy.org/all-topics/babies-and-kids"
      },
      {
        id: 15,
        title: "Baby Travel Tips",
        description: "Essential guide for traveling with infants and young children.",
        category: "Travel",
        imageUrl: "./assets/IMG-20250122-WA0016.jpg",
        link: "./assets/IMG-20250122-WA0020.jpg"
      },
      {
        id: 16,
        title: "Infant Swimming Safety",
        description: "Water safety guidelines and swimming introduction for babies.",
        category: "Safety",
        imageUrl: "/lovable-uploads/6f65f251-ed0b-445c-ad1c-025ad708ebf6.png",
        link: "https://www.healthychildren.org/English/safety-prevention/at-play/Pages/Water-Safety-And-Young-Children.aspx"
      },
      {
        id: 17,
        title: "Baby Skin Care",
        description: "Tips for maintaining healthy skin and treating common conditions.",
        category: "Health",
        imageUrl: "/lovable-uploads/7eb2c73c-1e46-4aa5-81d2-196bb4abee43.png",
        link: "https://www.aad.org/public/everyday-care/skin-care-basics/care/baby-skin-care"
      },
      {
        id: 18,
        title: "Music and Development",
        description: "How music influences baby's cognitive and emotional development.",
        category: "Development",
        imageUrl: "/lovable-uploads/6f65f251-ed0b-445c-ad1c-025ad708ebf6.png",
        link: "https://www.zerotothree.org/resource/music-and-your-baby/"
      },
      {
        id: 19,
        title: "Baby-Proofing Checklist",
        description: "Complete guide to making your home safe for mobile infants.",
        category: "Safety",
        imageUrl: "./assets/IMG-20250122-WA0015.jpg",
        link: "https://www.safekids.org/safetytips/field_risks/home-safety"
      },
      {
        id: 20,
        title: "Infant First Aid Kit",
        description: "Essential items to include in your baby's first aid kit.",
        category: "Health",
        imageUrl: "./assets/IMG-20250122-WA0016.jpg",
        link: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/anatomy-of-a-first-aid-kit.html"
      }
    ];
  