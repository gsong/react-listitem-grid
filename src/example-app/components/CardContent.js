//@flow strict
/** @jsx jsx */
import * as React from "react";
import VisuallyHidden from "@reach/visually-hidden";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";

type Props = {|
  contentType: string,
  handleMore: () => void,
  image: { url: string, alt?: string },
  itemWidth: number,
  subTitle: string,
  title: string,
  url: string,
|};

const CardContent = ({
  contentType,
  handleMore,
  image,
  itemWidth,
  subTitle,
  title,
  url,
}: Props): React.Node => {
  const [linkRef, clickProps] = useClickableContent();

  return (
    <React.Fragment>
      <Content {...clickProps} css={{ order: 1 }}>
        <header css={{ margin: "auto 6px 6px", order: 1, paddingTop: 6 }}>
          <Title>
            <a
              // $FlowIgnore
              ref={linkRef}
              href={url}
              css={{ color: "hsl(0, 0%, 25%)", textDecoration: "none" }}
            >
              {title}
            </a>
          </Title>
          <p css={titleStyle}>{subTitle}</p>
        </header>

        <img
          src={image.url}
          alt={image.alt ? image.alt : ""}
          css={{
            height: ((itemWidth - 2) * 9) / 16,
            objectFit: "cover",
            width: itemWidth - 2,
          }}
        />
      </Content>

      <ActionBar>
        <div aria-hidden css={{ margin: 6 }}>
          {contentType}
        </div>
        <VisuallyHidden>Content type is {contentType}</VisuallyHidden>
        <LinkButton
          onClick={handleMore}
          aria-label={`More actions for ${title}`}
        >
          •••
        </LinkButton>
      </ActionBar>
    </React.Fragment>
  );
};

const Content = styled.div({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,

  ":hover": { cursor: "pointer" },
});

const titleStyle = { textAlign: "center", width: "100%" };

const Title = styled.h2([
  titleStyle,
  {
    fontSize: 14,
    lineHeight: "1.35em",
    marginBottom: 6,

    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
  },
]);

const ActionBar = styled.div({
  alignItems: "baseline",
  display: "flex",
  justifyContent: "space-between",
});

const LinkButton = styled.button({
  backgroundColor: "transparent",
  border: "none",
  color: "hsl(0, 0%, 40%)",
  fontWeight: 900,
  letterSpacing: "0.15em",
  padding: 6,

  ":hover": { cursor: "pointer" },

  // stylelint-disable-next-line selector-list-comma-newline-after
  ":hover, :focus": {
    color: "orange",
    textShadow: "0 0 5px orange",
  },
});

export const useClickableContent = (): (Array<
  | {| current: HTMLElement | void |}
  | {| onMouseDown: () => number, onMouseUp: () => void |},
>) => {
  const link = React.useRef<HTMLElement | typeof undefined>();
  let down;

  const onMouseDown = () => (down = Date.now());
  const onMouseUp = () => {
    const elapsed = Date.now() - down;
    if (elapsed < 200) {
      // eslint-disable-next-line no-unused-expressions
      link.current?.click();
    }
  };

  return [link, { onMouseDown, onMouseUp }];
};

export default CardContent;
