/**
 * ITO Prompt Studio - 专业摄影提示词生成引擎
 * 基于视觉转译系统设计理念
 */

const PromptEngine = {
    // ============ 情绪词汇库 ============
    emotions: {
        'calm': '冷静、克制、疏离',
        'pressure': '压迫、紧张、危险',
        'tender': '温柔、浪漫、温暖',
        'violent': '暴烈、毁灭、戏剧性',
        'pure': '纯真、清新、自然',
        'mysterious': '神秘、忧郁、内省',
        'hope': '希望、光明、积极',
        'melancholy': '孤独、沉默、疏离',
        'disorder': '混乱、失序、失控',
        'order': '秩序、精准、理性',
        'fantasy': '梦幻、空灵、飘渺',
        'futuristic': '未来、科技、超现实'
    },

    // ============ 色彩方案库 ============
    colorSchemes: {
        'minimal': { primary: '浅灰/米白', secondary: '中灰/炭灰', text: '深黑', accent: '无或极淡', mood: '冷/克制/呼吸感' },
        'warm': { primary: '米白/浅粉', secondary: '浅灰/淡蓝', text: '深灰', accent: '极淡暖色', mood: '温暖/柔和' },
        'dramatic': { primary: '深红/黑', secondary: '警示黄/暗蓝', text: '白色', accent: '荧光色', mood: '压迫/紧张' },
        'violent': { primary: '黑/深红', secondary: '灰/白', text: '亮白', accent: '警示色', mood: '暴烈/撕裂' },
        'nordic': { primary: '冷灰/浅蓝', secondary: '墨绿/深蓝', text: '深灰/黑', accent: '无', mood: '冷静/克制' },
        'film': { primary: 'Kodak Portra暖调', secondary: 'Fuji Velvia高饱和', text: '自然色', accent: '极淡', mood: '胶片质感' },
        'cinematic': { primary: '青灰/蓝黑', secondary: '暖黄点缀', text: '高对比', accent: '戏剧光', mood: '电影感' }
    },

    // ============ 构图关系库 ============
    relationships: {
        'human_human': '人物 ↔ 人物（对峙/亲密/疏离）',
        'human_object': '人物 ↔ 物体（依附/触碰/互动）',
        'object_object': '物体 ↔ 物体（并置/对比/呼应）',
        'subject_space': '主体 ↔ 空间（巨大留白/尺度反差）',
        'subject_text': '主体 ↔ 文字（进入/穿越/遮挡）',
        'scale_contrast': '尺度反差（文字极大/人物极小）',
        'action_moment': '动作瞬间（凝固/穿越/爆发）',
        'distance': '距离关系（极远/极近/若即若离）'
    },

    // ============ 摄影技术参数 ============
    photography: {
        portrait: {
            lens: { '85mm': '人像黄金焦段，完美背景虚化', '50mm': '自然视角，接近人眼透视', '35mm': '环境人像，交代背景', '135mm': '空气感极强，强烈虚化' },
            aperture: { 'f/1.2-f/1.4': '奶油散景，极浅景深', 'f/1.8-f/2': '柔和虚化，人像推荐', 'f/2.8-f/4': '适度虚化，兼顾环境', 'f/5.6-f/8': '深景深，画面清晰' },
            lighting: {
                'rim': '轮廓光：主体与背景分离，勾勒边缘',
                'butterfly': '蝴蝶光：主光位于正上方，眼窝鼻翼阴影经典',
                'rembrandt': '伦勃朗光：45度侧光，三角光影戏剧性',
                'split': '分割光：面部一半明一半暗，强调轮廓',
                'softbox': '柔光箱：均匀柔和，商业人像标准',
                'golden': '黄金时刻：暖色侧光，长长阴影',
                'blue_hour': '蓝调时刻：冷色环境，戏剧氛围',
                'high_key': '高调：明亮纯净，情绪积极',
                'low_key': '低调：暗调为主，神秘压抑'
            }
        },
        product: {
            surface: { 'white': '纯白无缝背景，电商标准', 'gray_gradient': '灰度渐变，渐变过渡', 'marble': '大理石，奢华质感', 'wood': '木质表面，自然温暖', 'dark_mat': '深色哑光，戏剧对比' },
            lighting: { 'top_softbox': '顶部柔光箱，正面均匀照明', 'rim_light': '边缘轮廓光，勾勒产品边缘', 'reflector': '反光板填充，减少阴影', 'single_dramatic': '单灯戏剧光，高对比' }
        },
        landscape: {
            time: {
                'golden_hour': '黄金时刻：日出/日落前后1小时，暖色长影',
                'blue_hour': '蓝调时刻：日出前/日落后30分钟，冷调浪漫',
                'midday': '正午：顶光强烈，阴影短硬',
                'overcast': '阴天：漫射光，柔和无影',
                'storm': '暴风雨云：戏剧性天空，压迫氛围',
                'night': '夜景：城市灯光/星空，神秘深邃'
            },
            composition: {
                'rule_of_thirds': '三分法：经典构图，视觉平衡',
                'centered': '居中对称：庄严稳定，强迫注视',
                'leading_lines': '引导线：视线引导，深度感',
                'frame_in_frame': '框架构图：自然框架，聚焦主体'
            }
        }
    },

    // ============ 风格参考库 ============
    styleReferences: {
        'Annie Leibovitz': '经典人像，戏剧性场景编排，故事性强',
        'Peter Lindbergh': '黑白电影感，真实自然，时尚先驱',
        'Steven Meisel': '高对比时尚，光影运用大胆',
        'Riin Magazine': '极简编辑风，克制优雅',
        'Porsche Design': '工业美学，极简精准，德国设计',
        'Apple': '纯白背景，产品质感，简洁至上',
        'Hermes': '奢侈品牌美学，手工质感，画面讲究',
        'Ansel Adams': '风光摄影标杆，精准曝光，壮阔自然',
        'Hasselblad': '自然色彩科学，细节丰富',
        'Icelandic': '冰岛风光，空灵、超现实、色彩纯净',
        'Wabi_sabi': '侘寂美学，残缺之美，禅意空间'
    },

    // ============ 禁止元素库 ============
    prohibitions: {
        'no_cliché': '禁止套模板、堆元素、炫技',
        'no_separation': '禁止图文分离、无关装饰',
        'no_chaos': '禁止构图混乱、色彩失控',
        'no_commercial': '禁止电商感、插画封面风',
        'no_gradient_abuse': '禁止渐变滥用、霓虹乱用',
        'no_rainbow': '禁止彩虹色、脏色冲突'
    },

    // ============ 核心生成方法 ============

    /**
     * 人像摄影提示词生成
     */
    generatePortrait(config) {
        const {
            subject,         // 主体描述
            ethnicity,       // 种族/外貌
            age,             // 年龄
            gender,          // 性别
            emotion,         // 情绪
            clothing,        // 服装
            pose,            // 姿势
            background,      // 背景
            lighting,        // 光线（可多选）
            lens,            // 镜头
            aperture,        // 光圈
            dof,             // 景深
            colorGrade,      // 调色
            reference,       // 参考
            prohibition      // 禁止元素
        } = config;

        // 构建语义理解层
        const semanticLayer = `
【语义理解】
- 主体定义：${subject || '人物'}
${ethnicity ? `- 外貌特征：${ethnicity}` : ''}
${age ? `- 年龄范围：${age}` : ''}
- 情绪气质：${this.emotions[emotion] || emotion || '自然、真实'}
${clothing ? `- 服装风格：${clothing}` : ''}
${pose ? `- 姿势/动作：${pose}` : ''}
- 概念结构：人物情感表达，人物 ↔ 环境关系`;

        // 构建构图机制层
        const compositionLayer = `
【构图机制】
- 承载面：${background || '简洁背景，突出主体'}
- 演绎主体：1个主体人物
${pose ? `- 姿态表达：${pose}` : '- 姿态表达：自然舒展'}
- 文字嵌入：无（人像摄影不涉及文字）

【空间处理】
${background?.includes('bokeh') ? '- 背景虚化：Bokeh效果，梦幻散景' : '- 背景处理：简洁干净/情境化交代'}
- 景深控制：${dof || aperture || '浅景深，突出主体'}
- 构图比例：主体占画面${this.getCompositionRatio(emotion)}，留白适度`;

        // 构建色彩逻辑层
        const colorLayer = `
【色彩逻辑】
- 色彩数量：2-4种
- 色彩方案：${this.getColorScheme(colorGrade)}
${this.colorSchemes[colorGrade] ? `- 色彩目标：${this.colorSchemes[colorGrade].mood}` : ''}
- 主色控制：统一和谐，避免杂乱
- 情绪判断：色彩服务于情绪表达`;

        // 构建照明规格层
        const lightingLayer = `
【照明规格】
${this.buildLightingSpec(lighting, 'portrait')}
${lens ? `- 镜头焦段：${lens}，${this.photography.portrait.lens[lens] || '标准人像焦段'}` : ''}
${aperture ? `- 光圈设定：${aperture}，${this.photography.portrait.aperture[aperture] || '人像推荐'}` : ''}
- 光线质量：${lighting?.includes('soft') ? '柔和/漫射光' : '明确/戏剧光'}
${emotion === 'dramatic' || emotion === 'violent' ? '- 光影对比：高对比，营造戏剧张力' : '- 光影对比：适度明暗过渡'}`;

        // 构建风格参考层
        const styleLayer = `
【风格参考】
- 参考摄影师：${reference || 'Peter Lindbergh'}
${reference && this.styleReferences[reference] ? `- 风格解析：${this.styleReferences[reference]}` : ''}
${colorGrade ? `- 胶片模拟：${colorGrade}，${this.colorSchemes[colorGrade] ? this.colorSchemes[colorGrade].mood : '特定色调'}` : ''}
- 后期风格：专业杂志修图标准，保留质感`;

        // 构建禁止元素层
        const prohibitionLayer = `
【禁止元素】
${this.prohibitions.no_separation}
${this.prohibitions.no_chaos}
${prohibition || '无特殊禁止'}`;

        // 构建最终输出层
        const outputLayer = `
【输出要求】
- 质量标准：8K分辨率，专业摄影质感
- 平台适配：商业广告/时尚杂志级别
- 视觉目标：一瞬吸引，二瞬共鸣，三瞬回味`;

        // 组装完整提示词
        const prompt = `${semanticLayer}${compositionLayer}${colorLayer}${lightingLayer}${styleLayer}${prohibitionLayer}${outputLayer}`;

        return prompt.trim();
    },

    /**
     * 产品摄影提示词生成
     */
    generateProduct(config) {
        const {
            productName,     // 产品名称
            material,         // 材质
            color,            // 颜色
            type,             // 拍摄类型
            surface,          // 表面/背景
            lighting,         // 照明
            brand,            // 品牌参考
            quality           // 质量级别
        } = config;

        const surfaceSpec = this.photography.product.surface[surface] || surface;
        const lightSpec = this.photography.product.lighting[lighting] || lighting;
        const brandStyle = this.styleReferences[brand] || brand;

        const prompt = `【产品摄影专业提示词】

【产品定义】
- 产品名称：${productName || '产品'}
${material ? `- 材质质感：${material}` : ''}
${color ? `- 色彩特征：${color}` : ''}
- 拍摄类型：${type || '主图单品'}

【语义理解】
- 核心卖点：${this.extractProductCore(productName)}
- 情绪传达：${this.getProductMood(type)}
- 概念结构：产品功能与美学的结合

【构图机制】
- 承载面：${surfaceSpec}
- 演绎主体：1个产品主体
- 产品姿态：稳定展示/动态展示/场景融入
- 比例参照：${type?.includes('scale') ? '包含参照物，暗示真实尺寸' : '单品展示，纯净聚焦'}

【照明规格】
- 照明方案：${lightSpec}
${lighting === 'rim_light' ? '- 边缘光：勾勒产品轮廓，与背景分离' : ''}
${lighting === 'top_softbox' ? '- 顶部光：均匀渐变，电商标准' : ''}
- 光比控制：${this.getLightRatio(type)}
- 反射处理：${surface?.includes('marble') ? '大理石自然反射，克制点缀' : '产品表面反射精准控制'}

【色彩逻辑】
- 色彩数量：2-3种（产品色+背景色+光色）
- 主色：${color || surface?.includes('white') ? '产品本色为主' : '背景色为主'}
- 辅助色：中性灰/渐变过渡
- 强调色：${this.getProductAccent(type)}
- 色彩目标：${surface?.includes('dark') ? '暗调戏剧感' : '明亮通透/质感传递'}

【品牌参考】
- 参考品牌：${brand || 'Apple'}
${brandStyle ? `- 风格解析：${brandStyle}` : ''}
- 视觉标准：${brand === 'Apple' ? 'Apple产品摄影美学，极简精准' : '商业广告摄影标准'}

【禁止元素】
${this.prohibitions.no_commercial}
${this.prohibitions.no_gradient_abuse}
- 禁止杂散光线、灰尘颗粒、不均匀反射

【输出要求】
- 质量标准：${quality || '8K分辨率，商业广告级别'}
- 平台适配：天猫/京东/抖音主图
- 视觉目标：产品质感传递，品牌调性统一`;

        return prompt.trim();
    },

    /**
     * 风光建筑提示词生成
     */
    generateLandscape(config) {
        const {
            sceneType,        // 场景类型
            location,         // 具体地点
            time,             // 时间
            weather,          // 天气
            lighting,         // 光线方向
            lens,             // 镜头
            composition,      // 构图
            reference,        // 参考
            mood              // 情绪
        } = config;

        const timeSpec = this.photography.landscape.time[time] || time;
        const compSpec = this.photography.landscape.composition[composition] || composition;

        const prompt = `【风光建筑专业提示词】

【场景定义】
- 场景类型：${sceneType || '自然风光'}
${location ? `- 具体地点：${location}` : ''}
- 时间设定：${timeSpec}
${weather ? `- 天气状况：${weather}` : ''}

【语义理解】
- 核心气质：${this.emotions[mood] || mood || '壮美、震撼'}
- 情绪基调：${mood === 'calm' ? '宁静、沉思、与自然对话' : mood === 'dramatic' ? '戏剧性、压迫感、自然力量' : '客观记录、真实再现'}
- 概念结构：人与环境的关系，尺度对比

【构图机制】
- 承载面：${this.getLandscapeSurface(sceneType)}
- 演绎主体：${sceneType?.includes('urban') ? '建筑/城市元素' : sceneType?.includes('interior') ? '室内空间结构' : '自然地形/天空'}
${composition ? `- 构图法则：${compSpec}` : '- 构图法则：引导视线，创造深度'}
- 前景处理：${this.getForeground(sceneType)}
- 三层空间：前景(${sceneType?.includes('aerial') ? '省略' : '明确'}) / 中景 / 远景

【照明规格】
- 光线来源：${timeSpec}
${lighting ? `- 光线方向：${lighting}` : '- 光线方向：侧光/逆光增强戏剧性'}
${weather === 'storm' || weather === 'golden_hour' ? '- 光影对比：强烈，创造戏剧张力' : '- 光影质量：柔和过渡'}
- 曝光策略：${this.getExposureStrategy(time, weather)}

【色彩逻辑】
- 色彩数量：2-4种
${time === 'golden_hour' ? '- 主色调：暖橙/金色，浪漫氛围' : ''}
${time === 'blue_hour' ? '- 主色调：蓝紫/冷灰，静谧深邃' : ''}
${weather === 'overcast' ? '- 主色调：灰白/低饱和，柔和内敛' : ''}
- 色彩目标：${this.getColorMood(mood)}
- 天空处理：${weather === 'storm' ? '戏剧性云层，占据画面上部' : weather === 'night' ? '深蓝/黑色，点缀灯光' : '留白/渐变/细节交代'}

【风格参考】
- 参考摄影师：${reference || 'Ansel Adams'}
${reference && this.styleReferences[reference] ? `- 风格解析：${this.styleReferences[reference]}` : ''}
${sceneType?.includes('aerial') ? '- 视角特征：航拍视角，俯瞰全局' : ''}

【禁止元素】
${this.prohibitions.no_cliché}
- 禁止过度后期、色彩失真
${sceneType?.includes('urban') ? '- 避免：杂乱电线、破坏性元素' : '- 避免：人工痕迹、非自然元素'}

【输出要求】
- 质量标准：8K分辨率，风光摄影旗舰级
- 平台适配：杂志跨页/展览输出/数字媒体
- 视觉目标：一瞬震撼，二瞬沉浸，三瞬共鸣`;

        return prompt.trim();
    },

    /**
     * 意境创意提示词生成
     */
    generateCreative(config) {
        const {
            concept,          // 核心意境
            conceptDetail,     // 意境详解
            mood,              // 情绪基调
            artStyle,          // 艺术风格
            eastern,           // 东方意境（可多选）
            media,             // 混合媒介
            platform,          // 输出平台
            prohibition        // 禁止元素
        } = config;

        const prompt = `【意境创意专业提示词】

【语义理解】
- 核心概念：${concept || '抽象意境'}
${conceptDetail ? `- 概念详解：${conceptDetail}` : ''}
- 情绪气质：${this.emotions[mood] || mood || '空灵、深邃'}
${eastern?.length ? `- 东方意境：${eastern.join(' / ')}` : ''}
- 概念结构：${this.getConceptStructure(mood)}

【关系表达】
- 主关系：${this.relationships[this.getPrimaryRelation(mood)] || '主体 ↔ 空间'}
${eastern?.includes('留白') ? '- 留白处理：大量负空间，意境延伸' : ''}
${eastern?.includes('水墨') ? '- 水墨转译：笔触质感，浓淡干湿' : ''}
${eastern?.includes('禅意') ? '- 禅意表达：极简、克制、自然' : ''}

【构图机制】
- 构图原则：${this.getCreativeComposition(mood)}
${eastern?.length ? `- 东方构图：${this.getEasternComposition(eastern)}` : ''}
- 承载面：${this.getCreativeSurface(mood)}
${media === 'double_exposure' ? '- 曝光叠加：双重曝光，梦幻叠加' : ''}
${media === 'long_exposure' ? '- 长曝光：光轨/流水，时间流逝' : ''}
- 主体数量：${mood === 'violent' ? '动态瞬间，多元素冲突' : '1-3个，精简有力'}

【色彩逻辑】
- 色彩数量：${mood === 'minimal' ? '1-2种，极致克制' : '2-4种，精准控制'}
${this.colorSchemes[mood] ? `- 色彩方案：${this.colorSchemes[mood].primary}为主` : `- 色彩方案：情绪对应色调`}
${eastern?.includes('枯山水') ? '- 枯寂色系：白/灰/墨/青苔绿' : ''}
${eastern?.includes('烟雨') ? '- 烟雨色系：灰白/淡青/朦胧' : ''}
- 色彩目标：${this.emotions[mood] || mood}的情绪传递

【艺术风格】
- 风格定位：${artStyle || '艺术摄影'}
${artStyle === 'fine_art' ? '- 品质标准：美术馆收藏级' : ''}
${artStyle === 'conceptual' ? '- 概念深度：引发思考，超越表象' : ''}
${artStyle === 'cinematic' ? '- 电影感：叙事性，画面如剧照' : ''}
${media ? `- 媒介处理：${this.getMediaSpec(media)}` : ''}

${platform ? `【输出平台】
- 目标平台：${platform}
${platform === 'exhibition' ? '- 输出尺寸：大画幅展览级' : ''}
${platform === 'Instagram' ? '- 输出格式：1:1方形，适配移动端' : ''}
` : ''}

【禁止元素】
${this.prohibitions.no_cliché}
${this.prohibitions.no_separation}
${prohibition || '无特殊禁止'}

【最终检验】
- 一眼冲击：概念明确，视觉震撼
- 二眼理解：关系清晰，逻辑自洽
- 三眼巧妙：细节精妙，意味深长
- 核心判断：不是"画了什么"，而是"是否准确表达了'${concept}'这个词"`;

        return prompt.trim();
    },

    // ============ 辅助方法 ============

    getCompositionRatio(emotion) {
        const map = {
            'calm': '60-70%，主体突出，留白充足',
            'dramatic': '70-80%，主体占据主导',
            'tender': '50-60%，柔美均衡',
            'violent': '80%+，压迫感强烈',
            'mysterious': '40-50%，神秘留白多'
        };
        return map[emotion] || '60-70%';
    },

    buildLightingSpec(lights, context) {
        if (!lights) return '- 光线设定：自然光/标准照明';
        const specs = Array.isArray(lights) ? lights : [lights];
        return specs.map(l => `- 光线类型：${l}，${this.photography.portrait.lighting[l] || ''}`).join('\n');
    },

    getColorScheme(grade) {
        const scheme = this.colorSchemes[grade];
        if (!scheme) return `${grade}色调，情感化处理`;
        return `${scheme.primary}为主，${scheme.secondary}辅助，${scheme.text}为文字色，${scheme.accent}为强调`;
    },

    extractProductCore(name) {
        if (!name) return '产品核心价值';
        // 提取产品关键词
        const keywords = name.split(/[\s\-_]/).filter(w => w.length > 1);
        return keywords.slice(0, 3).join(' / ') || '产品核心价值';
    },

    getProductMood(type) {
        const moods = {
            'hero': '专业、高端、信赖',
            'lifestyle': '场景化、生活方式、代入感',
            'detail': '精致、品质、细节关注',
            'group': '丰富、全景、产品阵列',
            'scale': '真实、比例感、可信'
        };
        return moods[type] || '专业、高端';
    },

    getLightRatio(type) {
        return type === 'dramatic' ? '高对比 3:1以上' : type === 'hero' ? '标准 2:1' : '柔和 1.5:1';
    },

    getProductAccent(type) {
        return type === 'hero' ? '金属高光/边缘光' : '无或极淡';
    },

    getLandscapeSurface(sceneType) {
        if (sceneType?.includes('urban')) return '建筑基座/地面';
        if (sceneType?.includes('coastal')) return '海岸线/沙滩/礁石';
        if (sceneType?.includes('interior')) return '室内地面/平台';
        return '自然地表/草地/岩石/沙地';
    },

    getForeground(sceneType) {
        if (sceneType?.includes('aerial')) return '航拍视角无需前景';
        if (sceneType?.includes('urban')) return '建筑细节/街道元素';
        return '自然元素（花草/石头/水面）引导视线';
    },

    getExposureStrategy(time, weather) {
        if (time === 'golden_hour' || time === 'blue_hour') return '包围曝光，保留高光/阴影细节';
        if (weather === 'storm') return '减曝，压暗天空戏剧性';
        return '标准曝光，适当保留高光细节';
    },

    getColorMood(mood) {
        const moods = {
            'calm': '冷灰/低饱和，静谧克制',
            'dramatic': '高对比/戏剧光，张力十足',
            'tender': '暖色/柔和，浪漫氛围',
            'pure': '高饱和/纯净，自然生机'
        };
        return moods[mood] || '自然真实';
    },

    getConceptStructure(mood) {
        const structures = {
            'melancholy': '悖论/社会性：孤独vs人群，空虚vs充实',
            'hope': '象征/隐喻：光明/突破/新生',
            'violent': '冲突/张力：对抗/爆发/失控',
            'fantasy': '超现实/梦境：逻辑重组，视觉陌生化',
            'calm': '极简/克制：少即是多，意在言外'
        };
        return structures[mood] || '情绪张力/象征意义';
    },

    getPrimaryRelation(mood) {
        const relations = {
            'tender': 'human_human',
            'violent': 'action_moment',
            'mysterious': 'subject_space',
            'calm': 'scale_contrast',
            'fantasy': 'human_object'
        };
        return relations[mood] || 'subject_space';
    },

    getCreativeComposition(mood) {
        if (mood === 'calm') return '极简构图，大量留白，负空间美学';
        if (mood === 'dramatic') return '动态构图，不稳定感，视觉张力';
        if (mood === 'fantasy') return '超现实构图，元素漂浮，逻辑重组';
        return '创意构图，概念驱动';
    },

    getEasternComposition(eastern) {
        if (eastern.includes('枯山水')) return '枯寂美学，静止水面，石组布局';
        if (eastern.includes('水墨')) return '留白与飞白，笔断意连';
        if (eastern.includes('禅意')) return '不对称平衡，极简主义';
        return '东方美学融入';
    },

    getCreativeSurface(mood) {
        if (mood === 'fantasy') return '虚空/渐变/超现实基座';
        if (mood === 'violent') return '不稳定表面/碎片/混乱';
        return '简洁承载面/负空间';
    },

    getMediaSpec(media) {
        const specs = {
            'double_exposure': '双重曝光叠加，影像融合',
            'film_grain': '胶片颗粒，模拟复古质感',
            'long_exposure': '长曝光，时间流逝感',
            'tilt_shift': '移轴效果，微缩景观'
        };
        return specs[media] || media;
    }
};

// 导出给全局使用
window.PromptEngine = PromptEngine;
