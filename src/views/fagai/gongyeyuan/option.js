
const gongyeyuan = [
    {
        value: 'zhusanjiao',
        label: '珠三角地区',
        id: 1001,
        children: [
            { id: 4, label: '广州花都经济开发区', value: '4' },
            { id: 5, label: '广州保税区（黄埔）', value: '5' },
            { id: 6, label: '广东广州出口加工区', value: '6' },
            { id: 7, label: '广州南沙保税港区', value: '7' },
            { id: 8, label: '广州保税物流园区', value: '8' },
            { id: 10, label: '广州白云工业园区', value: '10' },
            { id: 11, label: '广东福田保税区', value: '11' },
            { id: 12, label: '深圳盐田综合保税区', value: '12' },
            { id: 13, label: '广东深圳出口加工区', value: '13' },
            { id: 14, label: '深圳前海湾保税港区', value: '14' },
            { id: 17, label: '东莞滨海湾开发区', value: '17' },
            { id: 18, label: '东莞松山湖高新技术产业开发区', value: '18' },
            { id: 19, label: '东莞水乡新城开发区', value: '19' },
            { id: 20, label: '东莞港开发区', value: '20' },
            { id: 22, label: '东莞保税物流中心', value: '22' },
            { id: 24, label: '广东佛山高明沧江工业园', value: '24' },
            { id: 25, label: '顺德高新技术产业开发区', value: '25' },
            { id: 27, label: '广东佛山禅城经济开发区', value: '27' },
            { id: 35, label: '珠澳跨境工业区', value: '35' },
            { id: 36, label: '广东珠海金湾联港工业园区', value: '36' },
            { id: 38, label: '珠海国家高新技术产业开发区', value: '38' },
            { id: 39, label: '广东惠州惠南高新科技产业园区(原名：广东惠州工业园区）', value: '39' },
            { id: 40, label: '惠州大亚湾经济技术开发区', value: '40' },
            { id: 41, label: '惠州仲恺高新技术产业开发区', value: '41' },
            { id: 42, label: '广东惠东县产业转移工业园区', value: '42' },
            { id: 43, label: '广东惠州惠阳经济开发区', value: '43' },
            { id: 44, label: '广东惠州大亚湾石化产业园区', value: '44' },
            { id: 45, label: '广东博罗县产业转移工业园区（博罗县智能制造产业园）', value: '45' },
            { id: 46, label: '广东惠州东江高新科技产业园区', value: '46' },
            { id: 48, label: '中山火炬高技术产业开发区', value: '48' },
            { id: 50, label: '中山保税物流中心', value: '50' },
            { id: 52, label: '广东江门新会经济开发区', value: '52' },
            { id: 53, label: '广东江门蓬江区产业转移工业园区（江门滨江新城产业园）', value: '53' },
            { id: 54, label: '开平翠山湖科技产业园（江门产业转移工业园开平园区）', value: '54' },
            { id: 55, label: '恩平工业园（江门产业转移工业园恩平园区）', value: '55' },
            { id: 56, label: '广东台山广海湾工业园区', value: '56' },
            { id: 57, label: '江门产业转移工业园台山片区', value: '57' },
            { id: 112, label: '肇庆高新技术产业开发区', value: '112' },
            { id: 113, label: '广东肇庆高要区产业转移工业园区（广东省肇庆（高要）汽车零部件产业园', value: '113' },
            { id: 114, label: '广东肇庆工业园区（鼎湖永安工业园）', value: '114' },
            { id: 115, label: '广东四会市产业转移工业园区（四会市特色产业工业园区）', value: '115' },
            { id: 116, label: '广东广宁县产业转移工业园区（广宁县产业开发区）', value: '116' },
            { id: 117, label: '广佛肇（怀集）经济合作区（广东怀集县产业转移工业园区）', value: '117' },
            { id: 119, label: '粤桂合作特别试验区', value: '119' },
            { id: 137, label: '中新广州知识城园区', value: '137' },
            { id: 138, label: '恩平工业园', value: '138' },
            { id: 139, label: '广东惠州惠南高新科技产业园区', value: '139' },
            { id: 140, label: '蛇口工业区', value: '140' },
            { id: 141, label: '广州-天河·公园智谷片区', value: '141' },
            { id: 142, label: '深圳高新区扩容区大学城片区', value: '142' },
            { id: 143, label: '白鹅潭现代服务业集聚区园区', value: '143' },
            { id: 144, label: '增城·太平洋夏埔片区', value: '144' },
            { id: 145, label: '开平翠山湖科技产业园拓展区', value: '145' },
            { id: 146, label: '深圳福田保税区-河套深方科技园', value: '146' },
            { id: 147, label: '深圳高新区扩容区新桥片区', value: '147' },
            { id: 150, label: '广州保税区', value: '150' },
            { id: 153, label: '深圳湾超级总部基地', value: '153' },
            { id: 154, label: '九龙山片区', value: '154' },
            { id: 155, label: '东莞石鼓片区', value: '155' },
            { id: 156, label: '江门银洲湖纸业基地', value: '156' },
            { id: 158, label: '燕罗片区', value: '158' },
            { id: 159, label: '中山小榄园', value: '159' },
            { id: 160, label: '深圳福田CBD', value: '160' },
            { id: 161, label: '深圳高新区扩容区坪山园区', value: '161' },
            { id: 162, label: '增城·珠江国际智能科技产业园片区', value: '162' },
            { id: 163, label: '中山板芙园', value: '163' },
            { id: 165, label: '前海深港现代服务业合作区', value: '165' },
            { id: 166, label: '深圳高新区扩容区留仙洞片区', value: '166' },
            { id: 167, label: '广东德庆县产业转移工业园区', value: '167' },
            { id: 168, label: '广东博罗县产业转移工业园区', value: '168' },
            { id: 169, label: '广东佛山三水工业园区', value: '169' },
            { id: 170, label: '佛山国家高新区禅城园', value: '170' },
            { id: 171, label: '松山湖', value: '171' },
            { id: 172, label: '平湖片区', value: '172' },
            { id: 173, label: '广州高新技术产业开发区', value: '173' },
            { id: 174, label: '光明科学城核心大装置片区', value: '174' },
            { id: 175, label: '中山坦洲园', value: '175' },
            { id: 176, label: '江门高新技术产业开发区', value: '176' },
            { id: 177, label: '东莞长安科技商务区', value: '177' },
            { id: 178, label: '深圳国际低碳城', value: '178' },
            { id: 179, label: '大运新城', value: '179' },
            { id: 180, label: '增城经济技术开发区核心区园区', value: '180' },
            { id: 181, label: '中山古镇园', value: '181' },
            { id: 182, label: '开平翠山湖科技产业园', value: '182' },
            { id: 183, label: '盐田河临港产业带', value: '183' },
            { id: 184, label: '广州国际健康产业城园区', value: '184' },
            { id: 185, label: '深圳高新区扩容区宝龙科技城片区', value: '185' },
            { id: 186, label: '广东惠州工业园区', value: '186' },
            { id: 188, label: '广东广州国际生物岛', value: '188' },
            { id: 190, label: '葵涌片区', value: '190' },
            { id: 191, label: '深圳高新技术产业开发区', value: '191' },
            { id: 192, label: '惠州产业转移工业园', value: '192' },
            { id: 194, label: '番禺节能科技园', value: '194' },
            { id: 195, label: '深圳国际生物谷', value: '195' },
            { id: 196, label: '中山民众园', value: '196' },
            { id: 197, label: '中子科学城', value: '197' },
            { id: 198, label: '中山黄圃园', value: '198' },
            { id: 199, label: '深圳高新区扩容区尖岗山园区', value: '199' },
            { id: 200, label: '广东珠海富山工业园区', value: '200' },
            { id: 201, label: '广东鹤山市产业转移工业园区', value: '201' },
            { id: 202, label: '香蜜湖片区', value: '202' },
            { id: 205, label: '广州国际创新城园区', value: '205' },
            { id: 206, label: '广东江门蓬江区产业转移工业园区', value: '206' },
            { id: 207, label: '东莞生态产业园', value: '207' },
            { id: 208, label: '鹏城片区', value: '208' },
            { id: 209, label: '珠海高新技术产业开发区', value: '209' },
            { id: 210, label: '光明凤凰城', value: '210' },
            { id: 211, label: '九龙山智能科技城', value: '211' },
            { id: 212, label: '佛山三龙湾高端创新集聚区', value: '212' },
            { id: 213, label: '梅林-彩田片区', value: '213' },
            { id: 215, label: '深圳空港新城', value: '215' },
            { id: 217, label: '中山三角园', value: '217' },
            { id: 218, label: '广东珠海保税区', value: '218' },
            { id: 219, label: '广东肇庆工业园区', value: '219' },
            { id: 221, label: '广州科学城园区', value: '221' },
            { id: 222, label: '广州云埔工业园区', value: '222' },
            { id: 223, label: '深中通道门户片区', value: '223' },
            { id: 225, label: '广州经济技术开发区', value: '225' },
            { id: 226, label: '新大片区', value: '226' },
            { id: 228, label: '龙华中心区', value: '228' },
            { id: 229, label: '佛山高新技术产业开发区', value: '229' },
            { id: 230, label: '中山翠亨新区', value: '230' },
            { id: 231, label: '广东深圳光明现代生物产业园', value: '231' },
            { id: 232, label: '珠澳跨境工业区珠海园区', value: '232' },
            { id: 233, label: '广东肇庆高要区产业转移工业园区', value: '233' },
            { id: 235, label: '恒盛工业园', value: '235' },
            { id: 237, label: '后海中心区片区', value: '237' },
            { id: 238, label: '广州南沙经济技术开发区', value: '238' },
            { id: 239, label: '东莞粤海装备产业园', value: '239' },
            { id: 240, label: '光明科学城启动片片区', value: '240' },
            { id: 241, label: '广州空港经济区园区', value: '241' },
            { id: 243, label: '琶洲互联网创新集聚区园区', value: '243' },
            { id: 244, label: '西涌片区', value: '244' },
            { id: 245, label: '深江产业园', value: '245' },
            { id: 246, label: '笋岗-清水河片区', value: '246' },
            { id: 247, label: '广东华强文化创意产业园', value: '247' },
            { id: 248, label: '广东中山保税物流园区', value: '248' },
            { id: 249, label: '深圳高新区扩容区石壁龙片区', value: '249' },
            { id: 250, label: '深圳高新区扩容区坂雪岗科学城片区', value: '250' },
            { id: 251, label: '广东广宁县产业转移工业园区', value: '251' },
            { id: 252, label: '中山火炬高技术开发区', value: '252' },
            { id: 253, label: '黄埔临港经济区园区', value: '253' },
            { id: 254, label: '宝安中心区', value: '254' },
            { id: 255, label: '珠西新材料集聚区', value: '255' },
            { id: 256, label: '增城经济技术开发区', value: '256' },
            { id: 257, label: '光明中心区片区', value: '257' },
            { id: 258, label: '东部工业园', value: '258' },
            { id: 259, label: '广州天河CBD', value: '259' },
            { id: 260, label: '坪山中心区', value: '260' },
            { id: 261, label: '广东从化经济开发区', value: '261' },
            { id: 262, label: '中大国际创新谷和南中轴创新带园区', value: '262' },
            { id: 263, label: '广东中山工业园区', value: '263' },
            { id: 264, label: '南隆片区', value: '264' },
            { id: 265, label: '天河智慧城园区', value: '265' },
            { id: 267, label: '深圳高新区扩容区西乡铁仔山片区', value: '267' },
            { id: 268, label: 'TIT创意园', value: '268' },
            { id: 269, label: '广州白云机场综合保税区', value: '269' },
            { id: 270, label: '深圳高新区扩容区观澜高新园片区', value: '270' },
            { id: 271, label: '南海高新技术产业开发区', value: '271' },
            { id: 272, label: '滨海湾新区', value: '272' },
            { id: 273, label: '广佛肇怀集经济合作区', value: '273' },
            { id: 274, label: '粤澳（江门）产业合作示范区', value: '274' },
            { id: 276, label: '珠海经济技术开发区', value: '276' },
            { id: 277, label: '黎光片区', value: '277' },
            { id: 278, label: '东莞虎门北站片区', value: '278' },
        ]
    },
    {
        value: 'yuedong',
        label: '沿海经济带东翼',
        id: 1002,
        children: [
            { id: 15, label: '深汕特别合作区', value: '15' },
            { id: 28, label: '广东省汕头市澄海岭海工业园', value: '28' },
            { id: 29, label: '汕头经济特区保税区', value: '29' },
            { id: 30, label: '广东汕头金平工业园区', value: '30' },
            { id: 31, label: '濠江区工业园(汕头市产业转移工业园濠江片区)', value: '31' },
            { id: 32, label: '汕头市潮阳区贵屿循环经济产业园区', value: '32' },
            { id: 33, label: '汕头市潮南区纺织印染环保工业园区（综合处理中心）', value: '33' },
            { id: 47, label: '广东惠来县产业转移工业园区（惠来临港开发区）', value: '47' },
            { id: 72, label: '广东普宁市产业转移工业园区（普宁市大健康产业园）', value: '72' },
            { id: 73, label: '广东省揭阳高新技术产业开发区（中德金属生态城）', value: '73' },
            { id: 74, label: '广东揭东经济开发区', value: '74' },
            { id: 75, label: '揭阳大南海石化工业区', value: '75' },
            { id: 76, label: '广东揭阳产业转移工业园区', value: '76' },
            { id: 91, label: '广东梅州经济开发区【广州（梅州）产业转移工业园东升片区】', value: '91' },
            { id: 92, label: '广东梅州高新技术产业园区【广州（梅州）产业转移工业园畲江片区】', value: '92' },
            { id: 93, label: '广东大埔县产业转移工业园区（广东大埔工业园区）', value: '93' },
            { id: 94, label: '广东梅州梅县区产业转移工业园区（广东梅县工业园区）', value: '94' },
            { id: 95, label: '广东梅州蕉华工业园区（广东梅州蕉华产业转移工业园）', value: '95' },
            { id: 96, label: '广东平远县产业转移工业园区（广东平远工业园区）', value: '96' },
            { id: 97, label: '广东兴宁市产业转移工业园区（广东兴宁工业园区）', value: '97' },
            { id: 98, label: '广东丰顺经济开发区【广州海珠（丰顺）产业转移工业园】', value: '98' },
            { id: 99, label: '广东五华经济开发区【广州番禺（五华）产业转移工业园】', value: '99' },
            { id: 100, label: '广东海丰经济开发区', value: '100' },
            { id: 101, label: '广东汕尾红海湾经济开发区', value: '101' },
            { id: 102, label: '广东陆丰东海经济开发区', value: '102' },
            { id: 103, label: '汕尾高新技术产业开发区', value: '103' },
            { id: 104, label: '广东汕尾星都经济开发区', value: '104' },
            { id: 105, label: '汕尾新区红草产业园（广东汕尾新区产业转移工业园区）', value: '105' },
            { id: 106, label: '广东陆河县产业转移工业园区（新河工业园区）', value: '106' },
            { id: 128, label: '广东潮州经济开发区', value: '128' },
            { id: 129, label: '闽粤经济合作区-饶平县经济开发区', value: '129' },
            { id: 130, label: '潮州高新技术产业开发区', value: '130' },
            { id: 131, label: '广东饶平潮州港经济开发区', value: '131' },
            { id: 132, label: '广东潮安经济开发区', value: '132' },
            { id: 133, label: '潮州市湘桥区经济开发区（广东潮州新区产业转移工业园区）', value: '133' },
        ]
    },
    {
        value: 'yuexi',
        label: '沿海经济带西翼',
        id: 1003,
        children: [
            { id: 58, label: '雷州市临港工业园', value: '58' },
            { id: 59, label: '广东奋勇东盟产业园（湛江奋勇高新技术产业开发区）', value: '59' },
            { id: 60, label: '湛江经济技术开发区', value: '60' },
            { id: 61, label: '广东吴川经济开发区', value: '61' },
            { id: 62, label: '广东遂溪县产业转移工业园区（遂溪县特色经济技术开发区）', value: '62' },
            { id: 63, label: '广东湛江临港工业园区', value: '63' },
            { id: 64, label: '湛江高新技术产业开发区', value: '64' },
            { id: 65, label: '广东湛江麻章经济开发区', value: '65' },
            { id: 66, label: '坡头区科技产业园（广东湛江海东新区产业转移工业园区）', value: '66' },
            { id: 67, label: '广东徐闻经济开发区', value: '67' },
            { id: 68, label: '广东信宜经济开发区（含信宜产业转移工业园）', value: '68' },
            { id: 69, label: '广东茂名石化产业园区', value: '69' },
            { id: 70, label: '茂名高新技术产业开发区', value: '70' },
            { id: 71, label: '广东茂名电白经济开发区【原广东茂名茂港经济开发区、含广州白云江高(电', value: '71' },
            { id: 107, label: '广东阳东经济开发区', value: '107' },
            { id: 108, label: '广东阳江工业园区(原广东阳江工业园区白石岗区块）', value: '108' },
            { id: 109, label: '广东阳西县产业转移工业园区(阳西工业园)', value: '109' },
            { id: 110, label: '广东阳江高新技术产业开发区（原广东阳江工业园区站港区块1、站港区块2', value: '110' },
            { id: 111, label: '广东阳春市产业转移工业园区（阳春经济开发区）', value: '111' },
        ]
    },
    {
        value: 'yuebei',
        label: '北部生态发展区',
        id: 1004,
        children: [
            { id: 77, label: '韶关高新技术产业开发区（广东韶关工业园区）', value: '77' },
            { id: 78, label: '广东乳源经济开发区', value: '78' },
            { id: 79, label: '广东乐昌经济开发区(乐昌产业转移工业园)', value: '79' },
            { id: 80, label: '广东翁源经济开发区', value: '80' },
            { id: 81, label: '广东韶关曲江经济开发区', value: '81' },
            { id: 82, label: '广东新丰县产业转移工业园区（韶关市新丰县产业转移集聚地）', value: '82' },
            { id: 83, label: '广东南雄市产业转移工业园区', value: '83' },
            { id: 84, label: '广东始兴工业园区', value: '84' },
            { id: 85, label: '河源市高新技术开发区（变更前名称：《中国开发区审核公告目录（2006版）', value: '85' },
            { id: 86, label: '广东和平县产业转移工业园区（和平县工业园）', value: '86' },
            { id: 87, label: '广东河源江东新区产业转移工业园区（原广东紫金经济开发区）', value: '87' },
            { id: 88, label: '广东河源源城区产业转移工业园区（河源市源城区工业园）', value: '88' },
            { id: 89, label: '广东龙川县产业转移工业园区（龙川县工业园）', value: '89' },
            { id: 90, label: '广东紫金县产业转移工业园区（紫金县临江工业园）', value: '90' },
            { id: 120, label: '清远高新技术产业开发区', value: '120' },
            { id: 121, label: '广东佛冈县产业转移工业园区（佛冈工业园）', value: '121' },
            { id: 122, label: '广东英德市产业转移工业园区(清远华侨工业园）', value: '122' },
            { id: 123, label: '广清产业园（广东清远燕湖新区产业转移工业园区）', value: '123' },
            { id: 124, label: '广东清远清新区产业转移工业园区', value: '124' },
            { id: 125, label: '广东顺德清远（英德）经济合作区', value: '125' },
            { id: 126, label: '广东连平县产业转移工业园区（连平县工业园）', value: '126' },
            { id: 127, label: '广东连州市产业转移工业园区（清远民族工业园）', value: '127' },
            { id: 134, label: '广东云浮工业园区（佛山〈云浮〉产业转移工业园）', value: '134' },
            { id: 135, label: '广东云浮云安区产业转移工业园区（云浮循环经济工业园）', value: '135' },
            { id: 136, label: '广东罗定市产业转移工业园区（云浮（罗定）工业园）', value: '136' },
        ]
    },
]

export default gongyeyuan;