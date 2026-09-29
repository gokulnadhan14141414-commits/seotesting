import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Code2, Sparkles, RefreshCw } from 'lucide-react';

type SchemaType = 'Article' | 'LocalBusiness' | 'FAQPage' | 'Product' | 'Organization';

export const SchemaGenerator: React.FC = () => {
  const [schemaType, setSchemaType] = useState<SchemaType>('LocalBusiness');
  const [copied, setCopied] = useState(false);

  // Form states
  const [articleData, setArticleData] = useState({
    headline: 'Complete Guide to Technical SEO in 2026',
    author: 'Elena Vance',
    publisher: 'Apex SEO Operations',
    url: 'https://example.com/blog/technical-seo-guide-2026',
    datePublished: '2026-03-25',
    image: 'https://example.com/images/technical-seo-cover.jpg',
    description: 'Learn how to master Core Web Vitals, JSON-LD schema implementation, and automated crawl auditing.',
  });

  const [businessData, setBusinessData] = useState({
    name: 'Apex Digital Marketing Lab',
    legalName: 'Apex Digital LLC',
    url: 'https://apexmarketing.example',
    telephone: '+1-512-555-0199',
    street: '1400 Congress Ave, Suite 400',
    city: 'Austin',
    state: 'TX',
    postalCode: '78701',
    country: 'US',
    priceRange: '$$$',
    openingHours: 'Mo-Fr 08:30-18:00',
  });

  const [faqItems, setFaqItems] = useState([
    {
      question: 'What is the benefit of automating our technical SEO crawl audits?',
      answer: 'Automated weekly crawls flag 404 broken links, missing canonicals, and uncompressed images before search bots de-index critical high-converting pages.',
    },
    {
      question: 'How often should Core Web Vitals (INP, LCP, CLS) be audited?',
      answer: 'We recommend scheduled weekly runs via Google PageSpeed Insights API with immediate Slack alerts if INP exceeds the 200ms threshold.',
    },
  ]);

  const [productData, setProductData] = useState({
    name: 'Enterprise SEO Operations Suite',
    description: 'Full-stack automation platform for multi-client digital marketing agencies and dev teams.',
    brand: 'ApexOps',
    sku: 'APEX-SEO-ENT-2026',
    price: '499.00',
    currency: 'USD',
    availability: 'https://schema.org/InStock',
    ratingValue: '4.9',
    reviewCount: '128',
  });

  const generateJsonLd = () => {
    switch (schemaType) {
      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: articleData.headline,
          description: articleData.description,
          image: [articleData.image],
          datePublished: articleData.datePublished,
          dateModified: new Date().toISOString().split('T')[0],
          author: {
            '@type': 'Person',
            name: articleData.author,
          },
          publisher: {
            '@type': 'Organization',
            name: articleData.publisher,
            logo: {
              '@type': 'ImageObject',
              url: 'https://example.com/logo.png',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleData.url,
          },
        };
      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: businessData.name,
          legalName: businessData.legalName,
          url: businessData.url,
          telephone: businessData.telephone,
          priceRange: businessData.priceRange,
          address: {
            '@type': 'PostalAddress',
            streetAddress: businessData.street,
            addressLocality: businessData.city,
            addressRegion: businessData.state,
            postalCode: businessData.postalCode,
            addressCountry: businessData.country,
          },
          openingHours: businessData.openingHours,
        };
      case 'FAQPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        };
      case 'Product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: productData.name,
          description: productData.description,
          brand: {
            '@type': 'Brand',
            name: productData.brand,
          },
          sku: productData.sku,
          offers: {
            '@type': 'Offer',
            price: productData.price,
            priceCurrency: productData.currency,
            availability: productData.availability,
            url: 'https://example.com/pricing',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: productData.ratingValue,
            reviewCount: productData.reviewCount,
          },
        };
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: businessData.name,
          url: businessData.url,
          logo: 'https://example.com/logo.png',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: businessData.telephone,
            contactType: 'customer service',
            areaServed: 'Worldwide',
            availableLanguage: ['English', 'Spanish'],
          },
        };
    }
  };

  const jsonString = JSON.stringify(generateJsonLd(), null, 2);
  const scriptTagCode = `<script type="application/ld+json">\n${jsonString}\n</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptTagCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>Tasks #18 & #47</span>
            <span>·</span>
            <span>Technical SEO & New Site Setup</span>
            <span>·</span>
            <span className="text-slate-400">Validation & Code Generation</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Schema Markup Generator & Validator</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Generates compliant JSON-LD structured data for article snippets, local business entity cards, FAQs, and products.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="https://validator.schema.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs font-medium text-slate-200 hover:text-white hover:border-slate-600 transition-colors"
          >
            <span>Schema.org Validator</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://search.google.com/test/rich-results"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-xs font-medium text-white hover:bg-emerald-500 transition-colors"
          >
            <span>Google Rich Results Test</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Schema Type Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
        {(['LocalBusiness', 'Article', 'FAQPage', 'Product', 'Organization'] as SchemaType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSchemaType(type)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              schemaType === type
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Two Column Layout: Editor & Live Code Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Form */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Configure {schemaType} Parameters
            </h3>
            <span className="text-xs text-slate-500">Live Sync</span>
          </div>

          {schemaType === 'LocalBusiness' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Business Name</label>
                <input
                  type="text"
                  value={businessData.name}
                  onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Telephone</label>
                  <input
                    type="text"
                    value={businessData.telephone}
                    onChange={(e) => setBusinessData({ ...businessData, telephone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Price Range</label>
                  <input
                    type="text"
                    value={businessData.priceRange}
                    onChange={(e) => setBusinessData({ ...businessData, priceRange: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Street Address</label>
                <input
                  type="text"
                  value={businessData.street}
                  onChange={(e) => setBusinessData({ ...businessData, street: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">City</label>
                  <input
                    type="text"
                    value={businessData.city}
                    onChange={(e) => setBusinessData({ ...businessData, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">State / Zip</label>
                  <input
                    type="text"
                    value={`${businessData.state} ${businessData.postalCode}`}
                    onChange={(e) => {
                      const [state, zip] = e.target.value.split(' ');
                      setBusinessData({ ...businessData, state: state || '', postalCode: zip || '' });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Country</label>
                  <input
                    type="text"
                    value={businessData.country}
                    onChange={(e) => setBusinessData({ ...businessData, country: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Opening Hours Specification</label>
                <input
                  type="text"
                  value={businessData.openingHours}
                  onChange={(e) => setBusinessData({ ...businessData, openingHours: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {schemaType === 'Article' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Article Headline</label>
                <input
                  type="text"
                  value={articleData.headline}
                  onChange={(e) => setArticleData({ ...articleData, headline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={articleData.author}
                    onChange={(e) => setArticleData({ ...articleData, author: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Publish Date</label>
                  <input
                    type="date"
                    value={articleData.datePublished}
                    onChange={(e) => setArticleData({ ...articleData, datePublished: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Article URL</label>
                <input
                  type="url"
                  value={articleData.url}
                  onChange={(e) => setArticleData({ ...articleData, url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Short Description / Meta Excerpt</label>
                <textarea
                  rows={2}
                  value={articleData.description}
                  onChange={(e) => setArticleData({ ...articleData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>
            </div>
          )}

          {schemaType === 'FAQPage' && (
            <div className="space-y-3 text-xs">
              {faqItems.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-300">Q&A Pair #{idx + 1}</span>
                    {faqItems.length > 1 && (
                      <button
                        onClick={() => setFaqItems(faqItems.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Question text..."
                    value={item.question}
                    onChange={(e) => {
                      const updated = [...faqItems];
                      updated[idx].question = e.target.value;
                      setFaqItems(updated);
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
                  />
                  <textarea
                    rows={2}
                    placeholder="Answer text..."
                    value={item.answer}
                    onChange={(e) => {
                      const updated = [...faqItems];
                      updated[idx].answer = e.target.value;
                      setFaqItems(updated);
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 resize-none"
                  />
                </div>
              ))}
              <button
                onClick={() => setFaqItems([...faqItems, { question: '', answer: '' }])}
                className="w-full py-2 border border-dashed border-slate-700 rounded-xl text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
              >
                + Add Another Question Pair
              </button>
            </div>
          )}

          {schemaType === 'Product' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Product Title</label>
                <input
                  type="text"
                  value={productData.name}
                  onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={productData.brand}
                    onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Price (USD)</label>
                  <input
                    type="text"
                    value={productData.price}
                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Rating (1-5)</label>
                  <input
                    type="text"
                    value={productData.ratingValue}
                    onChange={(e) => setProductData({ ...productData, ratingValue: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Review Count</label>
                  <input
                    type="text"
                    value={productData.reviewCount}
                    onChange={(e) => setProductData({ ...productData, reviewCount: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200"
                  />
                </div>
              </div>
            </div>
          )}

          {schemaType === 'Organization' && (
            <div className="text-xs text-slate-400">
              <p>Re-uses organization profile values from the primary agency profile. Generates Google Knowledge Graph entity properties.</p>
            </div>
          )}
        </div>

        {/* Right: Code Generation Output */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950/70 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-slate-300">schema-{schemaType.toLowerCase()}.jsonld</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-medium transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied HTML snippet!' : 'Copy <script> Tag'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-950 overflow-x-auto max-h-[500px]">
            <pre className="text-xs font-mono text-emerald-300 leading-relaxed">
              <code>{scriptTagCode}</code>
            </pre>
          </div>

          <div className="px-4 py-3 bg-slate-950/40 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Dev Note from Matrix: "Build reusable JSON-LD templates by page type; validate before deploy"</span>
            <span className="text-emerald-400 font-mono">100% Valid Syntax</span>
          </div>
        </div>
      </div>
    </div>
  );
};
