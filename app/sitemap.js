export default function sitemap() {
  return [
    {
      url: 'https://omlang.quarry.dpdns.org', // আপনার ওয়েবসাইটের মূল লিংক
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // ভবিষ্যতে যদি /docs বা /about পেজ বানান, তবে সেগুলো এখানে নিচে নিচে যোগ করবেন
    // {
    //   url: 'https://omlang.quarry.dpdns.org/docs',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}
