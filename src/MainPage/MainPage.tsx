import React, { useState, ChangeEvent, Fragment } from 'react';
import { useRouter } from 'next/router';
import { Option, isNone } from 'fp-ts/lib/Option';
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import { absurd } from 'fp-ts/lib/function';
import { MainLayout } from '../Layout';
import { useProfileStore } from '../Store/Root';
import { Profile, ProfileType } from '../Profile';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    title: {
      marginBottom: spacing(2),
    },
    instructionParagraph: {
      '&:not(:last-child)': {
        marginBottom: spacing(2),
      },
    },
  }),
);

type UserType = ProfileType | 'none';

interface Panel {
  id: number;
  title: string;
  text: JSX.Element | JSX.Element[];
  actions: Action[];
  displaysFor: UserType[];
}

interface Action {
  text: string;

  action(): void;
}

function MainPage(): JSX.Element {
  const { profile } = useProfileStore();

  function getProfileType(profile_: Option<Profile>): UserType {
    if (isNone(profile_)) return 'none';
    return profile_.value.type;
  }

  const type = getProfileType(profile);

  function registrationInstruction(
    user: string,
    superior: string,
  ): JSX.Element {
    return (
      <Fragment>
        Для того, чтобы зарегистрироваться {user}, необходимо сначала получить у{' '}
        {superior} регистрационный код, затем нужно перейти на страницу
        регистрации, ввести регистрационный код, имя, фамилию и нажать кнопку
        &quot;Далее&quot;. Затем ввести адрес своей электронной почты, придумать
        пароль, а потом повторить его и нажать кнопку
        &quot;Зарегистрироваться&quot;. На указанную электронную почту придёт
        письмо с подтверждением. В письме необходимо нажать кнопку
        &quot;Активировать аккаунт&quot; и после этого можно будет войти в свой
        аккаунт на странице входа с помощью указанного адреса электронной почты
        и пароля.
      </Fragment>
    );
  }

  const registrationActions: Action[] = [
    {
      text: 'Войти',
      action(): void {
        router.push('/login');
      },
    },
    {
      text: 'Зарегистрироваться',
      action(): void {
        router.push('/registration');
      },
    },
  ];

  const router = useRouter();

  const panels: Panel[] = [
    {
      id: 1,
      title: 'Инструкция для регистрации студента',
      text: registrationInstruction('студенту', 'преподавателя'),
      actions: registrationActions,
      displaysFor: ['admin', 'teacher', 'none'],
    },
    {
      id: 2,
      title: 'Инструкция для регистрации преподавателя',
      text: registrationInstruction('преподавателю', 'администратора'),
      actions: registrationActions,
      displaysFor: ['admin', 'none'],
    },
    {
      id: 3,
      title: 'Инструкция для студента',
      text: (
        <Fragment>
          У студента есть возможность выполнять практические работы. Для этого
          необходимо перейи на страницу практических работ. На этой странице
          отображается список практических работ, их номер и тема. При нажатии
          на одну из работ осуществляется переход на станицу практической
          работы. Тут представлена тема практической работы, её цели и набор
          заданий. Каждое задание имеет текст, дополнительные данные и поля для
          внесения ответов на задание. Необходимо выполнить все задания и
          вписать ответы в соответствующие поля. После этого следует нажать
          кнопку &quot;Проверить&quot;. Осуществится отправка и проверка ответов
          и будет показан результат. Результат включает в себя оценку,
          количество баллов за всю работу и по каждому заданию. Если оценка 2,
          то студенту предоставляется возможность ещё раз пройти практическую
          работу с теми же заданиями, пока оценка не будет удовлетворительной.
          Далее эти результаты сможет увидеть преподаватель.
        </Fragment>
      ),
      actions: [
        {
          text: 'Практические работы',
          action(): void {
            router.push('/lessons');
          },
        },
      ],
      displaysFor: ['admin', 'teacher', 'student'],
    },
    {
      id: 4,
      title: 'Инструкция для преподавателя',
      text: [
        <Fragment>
          У преподавателя есть возможность создавать группы и студентов в них.
          Для создания группы необходимо перейти на страницу групп и в правом
          верхнем углу таблицы нажатьнажать кнопку &quot;Добавить&quot;, вписать
          название группы и ввести список студентов, которые обучаются в этой
          группе и нажать кнопку &quot;Добавить&quot;. В списке появится
          созданная группа. При нажатии на группу в списке осуществится переход
          на страницу группы, где можно увидеть список её студентов, добавить
          нового студента, изменить данные существующего студента, а также
          удалить студентов. При добавлении нового студента он помечается как
          незарегистрированныйи если нажать кнопку &quot;Регистрационные
          коды&quot; в правом верхнем углу таблицы, то можно посмотреть список
          всех незарегистрированных студентов и их регистрационные коды. Также
          имеется кнопка для печати таблицы регистрационных кодов или сохранения
          таблицы как PDF файла. Эти регистрационные коды необходимо передать
          студентам, для того, чтобы они смогли зарегистрироваться. После того,
          как студент зарегистрирован, он изчезается из списка регистрационных
          кодов и помечаетя как зарегистрированный. Группы разграничатьются
          между преподавателями. Один преподаватель не может Видеть группы
          созданные другим преподавателем, а также изменять состав студентов
          группы.
        </Fragment>,
        <Fragment>
          Также у преподавателя есть возможность просматривать результаты
          выполнения практических работ студентами своих групп. Для этого
          необходимо перейти в панель преподавателя. Далее выбрать группу,
          результаты которой надо посмотреть и выбрать из списка практическую
          работу, по которой необходимо посмотреть результаты. Появится таблица
          студентов с статусом выполнения работы (сдано, не сдано) и оценкой,
          если она есть. Имеется фильтр для статуса и оценки, при помощи
          которого можно отфильтровать список студентов по необхомому статусу
          выполнения работы или по желаемоей оценке. При выделении строчки с
          помощью маркера на левом конце строки можно удалить результаты
          выполнения работынажан кнопку &quot;Удалить&quot; в правом верхнем
          углу. При нажатии на саму строку раскрывается дополнительная ифномация
          о результате выполнения работы, это порядковый номер студента,
          количество набранных им балла за всю работу и по каждому заданию.
        </Fragment>,
      ],
      actions: [
        {
          text: 'Группы',
          action(): void {
            router.push('/groups');
          },
        },
        {
          text: 'Панель преподавателя',
          action(): void {
            router.push('/teacher-panel/groups');
          },
        },
      ],
      displaysFor: ['admin', 'teacher'],
    },
    {
      id: 5,
      title: 'Инструкция для администратора',
      text: (
        <Fragment>
          У администратора есть возможность создавать преподавателей. Для
          создания преподавателя необходимо перейти на страницу преподавателей и
          в правом верхнем углу таблицы нажать нажать кнопку
          &quot;Добавить&quot;, вписать имя преподавателя и нажать кнопку
          &quot;Добавить&quot;. В списке появится созданный преподаватель. В
          списоке преподавателей также можно, изменить данные существующих
          преподавателей и удалитя их. При добавлении нового преподавателя он
          помечается как незарегистрированный и если нажать кнопку
          &quot;Регистрационные коды&quot; в правом верхнем углу таблицы, то
          можно посмотреть список всех незарегистрированных преподавателей и их
          регистрационные коды. Также имеется кнопка для печати таблицы
          регистрационных кодов или сохранения таблицы как PDF файла. Этот
          регистрационный код необходимо передать преподавателю, для того, чтобы
          он смог зарегистрироваться. После того, как преподаватель
          зарегистрирован, он изчезается из списка регистрационных кодов и
          помечаетя как зарегистрированный.
        </Fragment>
      ),
      actions: [
        {
          text: 'Преподаватели',
          action(): void {
            router.push('/teachers');
          },
        },
      ],
      displaysFor: ['admin'],
    },
  ];

  const [activePanel, setActivePanel] = useState<number | undefined>(() => {
    if (type === 'admin') return 5;
    if (type === 'teacher') return 4;
    if (type === 'student') return 3;
    if (type === 'none') return undefined;
    return absurd(type);
  });

  const handlePanelToggle = (panelId: number) => (
    _: ChangeEvent<{}>,
    isExpanded: boolean,
  ): void => {
    setActivePanel(isExpanded ? panelId : undefined);
  };

  const classes = useStyles();

  return (
    <MainLayout title="Main page">
      <Container maxWidth="sm">
        {/*
        <Typography
          className={classes.title}
          component="h2"
          variant="h4"
          align="center"
        >
          Заголовок
        </Typography>
        */}
        {panels
          .filter(panel => panel.displaysFor.includes(type))
          .map(panel => (
            <ExpansionPanel
              key={panel.id}
              expanded={activePanel === panel.id}
              onChange={handlePanelToggle(panel.id)}
            >
              <ExpansionPanelSummary>
                <Typography component="h3" variant="h6">
                  {panel.title}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  {!Array.isArray(panel.text) ? (
                    <Typography align="justify">{panel.text}</Typography>
                  ) : (
                    panel.text.map((text, textIndex) => (
                      /* eslint-disable react/no-array-index-key */
                      <Typography
                        key={textIndex}
                        className={classes.instructionParagraph}
                        align="justify"
                      >
                        {text}
                      </Typography>
                    ))
                  )}
                </div>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                {panel.actions.map((action, actionIndex, actions) => {
                  const lastAction = actionIndex === actions.length - 1;
                  return (
                    <Button
                      key={action.text}
                      color={lastAction ? 'primary' : undefined}
                      onClick={action.action}
                    >
                      {action.text}
                    </Button>
                  );
                })}
              </ExpansionPanelActions>
            </ExpansionPanel>
          ))}
      </Container>
    </MainLayout>
  );
}

export default MainPage;
