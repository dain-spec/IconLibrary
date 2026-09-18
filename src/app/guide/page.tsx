import Image from "next/image";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-surface">
      {children}
    </span>
  );
}

function Section({
  title,
  badge,
  description,
  children,
}: {
  title: string;
  badge?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-border py-12 first:pt-0 last:border-b-0">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-ink">{title}</h2>
        {badge && <Badge>{badge}</Badge>}
      </div>
      {description && (
        <p className="mt-2 max-w-3xl text-sm text-muted">{description}</p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}

function DiagramImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full"
      />
    </div>
  );
}

export default function GuidePage() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <p className="text-sm text-muted">2026. 9. · 프로덕트경험센터 / Product UX UI 1 Unit</p>
        <h1 className="mt-2 text-4xl font-bold text-ink">Icon Design Guide</h1>

        <div className="mt-10">
          <Section
            title="Categories"
            description="아이콘은 서비스 내 기능과 정보를 직관적으로 전달하기 위한 그래픽 요소입니다. 모노크롬 아이콘은 다양한 시각적 표현과 폰트의 맥락에 맞춰, Line과 Fill 두 가지 타입으로 제공됩니다."
          >
            <DiagramImage src="/guide/01-categories.png" alt="Monochrome/Multicolor 카테고리 예시" width={1024} height={492} />
          </Section>

          <Section
            title="Grid"
            description="Grid는 24x24px을 기본으로 사용하며, 크기 및 목적에 따라 조정될 수 있습니다."
          >
            <DiagramImage src="/guide/02-grid.png" alt="24x24 그리드" width={2000} height={412} />
          </Section>

          <Section
            title="Padding"
            description="Grid에는 상하좌우 2px의 Padding이 포함됩니다. 아이콘은 padding을 제외한 영역 안에 그리도록 합니다."
          >
            <DiagramImage src="/guide/03-padding.png" alt="Live Area와 Padding" width={2000} height={412} />
          </Section>

          <Section
            title="Key shape"
            description="Key Shape은 각 아이콘의 기본 틀을 정의합니다. 비슷한 비율의 아이콘에 일관성을 줄 수 있습니다. 아래의 가이드를 따라 형태를 잡습니다."
          >
            <DiagramImage src="/guide/04-keyshape.png" alt="Square, Vertical/Horizontal Rectangle, Circle 키 셰이프" width={1999} height={960} />
          </Section>

          <Section
            title="Radius"
            description="기본 도형인 컨테이너는 3.5px로 적용하고 그 외 디테일한 형태들은 조정하여 사용할 수 있습니다."
          >
            <DiagramImage src="/guide/05-radius.png" alt="Line/Fill/MultiColor 타입별 코너 radius" width={1999} height={960} />
          </Section>

          <Section title="두께">
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-3">
                  <Badge>Monochrome</Badge>
                </div>
                <p className="mt-2 max-w-3xl text-sm text-muted">
                  24 사이즈의 아이콘 기본 두께는 1.5px이나 1 또는 2px를 적용할 수 있으며 획의 정렬은 Center로 합니다.
                </p>
                <div className="mt-4">
                  <DiagramImage src="/guide/06-thickness-mono.png" alt="Monochrome 두께 1.5 / 2 / 1px" width={1999} height={960} />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <Badge>MultiColor</Badge>
                </div>
                <p className="mt-2 max-w-3xl text-sm text-muted">
                  내부에 개체의 형태를 묘사할 경우 최소 2px 라인 두께를 사용합니다. 단, 디테일 표현 및 형태 구분을 위해 필요한 경우 최소 2px 미만의 라인을 예외적으로 허용합니다.
                </p>
                <div className="mt-4">
                  <DiagramImage src="/guide/07-thickness-multi.png" alt="MultiColor 두께 예시" width={2000} height={527} />
                </div>
              </div>
            </div>
          </Section>

          <Section
            title="조합"
            description="두 개의 의미 요소를 결합하여 표현할 때는 기본 아이콘에 보조 아이콘을 우측 하단에 위치합니다. 단, 아이콘의 형태와 의미 전달을 위해 필요한 경우 보조 아이콘의 위치와 크기를 예외적으로 조정할 수 있습니다."
          >
            <DiagramImage src="/guide/08-composition.png" alt="기본 아이콘과 보조 아이콘 조합 예시" width={2000} height={972} />
          </Section>

          <Section
            title="Color"
            badge="MultiColor"
            description="Multicolor Icon의 색상은 정보의 명확한 구분과 시각적 일관성을 위해 정의된 팔레트 사용을 권장합니다. 라이트·다크 환경에서의 가독성과 색상 대비를 고려하여 컬러를 구성하였으나 서비스 특성 및 사용 목적에 따라 색상 변경이 가능합니다."
          >
            <DiagramImage src="/guide/09-color.png" alt="라이트/다크 모드 컬러 팔레트" width={1999} height={953} />
          </Section>

          <Section
            title="Size"
            description="아이콘은 기본적으로 24px 크기로 제공되며, 용도에 맞게 비율을 유지하며 조정할 수 있습니다. 사용자의 시각적 인지를 고려하여 아래와 같은 최소 크기 및 베리언츠를 권장합니다."
          >
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
              <li>아이콘의 최소 크기는 12px로 제한합니다.</li>
              <li>
                14px 이하의 작은 사이즈에서는 시각적 복잡도를 줄이고 명확한 인지를 위해{" "}
                <strong className="text-ink">Fill 형태의 사용을 권장</strong>합니다.
              </li>
              <li>
                사용 환경 및 목적에 따라 <strong className="text-ink">사이즈별로 아이콘의 형태를 조정</strong>하여 표현할 수 있습니다.
              </li>
            </ul>
            <div className="mt-4">
              <DiagramImage src="/guide/10-size.png" alt="12px~24px 사이즈별 아이콘 형태 변경" width={2000} height={942} />
            </div>
          </Section>

          <Section
            title="제작방법"
            description="아이콘 오브젝트의 원형 보존 및 추후 변형의 용의성을 위해 원본과 배포하는 영역은 분리하여 보존합니다."
          >
            <DiagramImage src="/guide/11-production.png" alt="Step 1~4 제작 과정" width={1999} height={960} />
          </Section>

          <Section
            title="참고. 플러그인 SVG Simplizer(Compound Path)"
            description="아이콘 오브젝트를 Flatten 까지 적용하는 것과 그 이후 플러그인을 적용하는 것은 SVG 추출 시, 차이가 있습니다."
          >
            <DiagramImage src="/guide/12-svg-simplizer.png" alt="Flatten만 적용 vs 플러그인 적용 비교" width={1999} height={960} />
          </Section>

          <Section
            title="Icon naming convention"
            description="Figma 라이브러리 스타일을 작성하고 적재시, 아래의 네이밍 규칙을 적용합니다."
          >
            <DiagramImage src="/guide/13-naming.png" alt="ic_[name]_[style] 네이밍 규칙과 예시" width={1999} height={960} />
          </Section>
        </div>
      </div>
    </div>
  );
}
